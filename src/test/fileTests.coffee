# return if global.window

# index = require '../'
# fs = require 'fs'
# np = require 'path'

# readFile = (path) -> fs.readFileSync path, "utf8"

# writeFile = (path, content) -> fs.writeFileSync path, content, "utf8"

# deleteFile = (path) ->
#     if fs.existsSync path
#         fs.unlinkSync path

# readOutputAsJSON = (config) ->
#     files = fs.readdirSync config.output
#     result = {}
#     for file in files
#         path = np.join config.output, file
#         content = readFile path
#         result[file] = content
#     return result

# exports.test =
#     parse: (done) ->
#         ast = index.parseStatement """
#             Directory = require("../builder/Directory")
#             input = new Directory($input)
#             files: new Directory($output)
#                 for input.search(".test")
#                     [key.substring(0, key.length - ".test".length) + ".output"]: parseInt(.read()) * 2
#             """
#         config =
#             input: "src/test/input"
#             output: "src/test/output"
#         output = {}

#         deleteFiles = ->
# 	        deleteFile np.join config.input, "charlie.test"
# 	        deleteFile np.join config.output, "alpha.output"
# 	        deleteFile np.join config.output, "beta.output"
# 	        deleteFile np.join config.output, "charlie.output"

#         # prep work beforehand
#         writeFile np.join(config.input, "alpha.test"), "1"
#         writeFile np.join(config.input, "beta.test"), "2"
#         deleteFiles()

#         # create the runtime and activate it
#         s = index.createRuntime ast, config, output, {require:require}
#         s.activate()

#         # console.log JSON.stringify output, null, '  '

#         # verify that it has immediately generated the expected output
#         if not Object.equal result = readOutputAsJSON(config), expected = {"alpha.output": "2", "beta.output": "4"}
#             throw new Error("#{JSON.stringify result} != #{JSON.stringify expected}")

#         # now delete beta, modify alpha and create delta
#         writeFile np.join(config.input, "alpha.test"), "10"
#         deleteFile np.join(config.input, "beta.test")
#         writeFile np.join(config.input, "charlie.test"), "3"

#         # now we watch the output directory for changes
#         # and we are done when the changes become what we expect for the final condition.
#         interval = setInterval (->
#             if Object.equal result = readOutputAsJSON(config), expected = {"alpha.output": "20", "charlie.output": "6"}
#                 clearInterval interval
#                 s.deactivate()
#                 deleteFiles()
#                 done()
#             ), 100
