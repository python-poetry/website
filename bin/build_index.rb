#!/usr/bin/env ruby

require 'algolia_html_extractor'
require 'json'
require 'nokogiri'
require 'pathname'
require 'toml-rb'

root_dir = File.join(__dir__, "..")

config = TomlRB.load_file(File.join(root_dir, "config.toml"))
default_version = config["params"]["documentation"]["defaultVersion"]
versions = config["params"]["documentation"]["versions"]

base_doc_dir = File.join(__dir__, "..", "public", "docs")
index_file = File.join(__dir__, "..", "algolia.json")
records = []
versions.each do |version|
    exclude_dirs = []

    if version == default_version
        doc_dir = base_doc_dir
        exclude_dirs = versions.each { |version| File.join(base_doc_dir, version) }
    else
        doc_dir = File.join(base_doc_dir, version)
    end

    Dir.glob(File.join(doc_dir, "*/*.html")).each do |file|
        if exclude_dirs.any? { |dir| file.to_s.start_with?(dir.to_s)}
            next
        end

        content = Nokogiri::HTML(File.read(file)).at_css("main").to_s
        page = AlgoliaHTMLExtractor.run(content)
        page.each do |record|
            if record[:anchor] == "footerHeading"
                next
            end

            rel_permalink = "/" + Pathname(File.dirname(file)).relative_path_from(File.join(__dir__, "..", "public")).to_s
            if !record[:anchor].empty?
                rel_permalink = rel_permalink + "##{record[:anchor]}"
            end

            headings = record[:headings].collect { |heading| heading.gsub(' # ', '').strip }

            record = {
                title: headings[-1],
                headings: headings,
                content: record[:content],
                anchor: record[:anchor],
                version: version,
                relpermalink: rel_permalink,
                custom_ranking: record[:custom_ranking]
            }

            record["objectID"] = AlgoliaHTMLExtractor.uuid(record)

            records.push(record)
        end
    end
end

File.write(index_file, JSON.generate(records))
