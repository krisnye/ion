# ion = require '../'

# expressionTests = [
#     # ["$x + $y", {x:1,y:2}, {x:10}, 12]
#     [
#         """
#         {}
#             name: $order.name
#             items: []
#                 for $order.items
#                     {}
#                         name: .[0]
#                         quantity: .[1]
#                         unitPrice: $store.items[@name].price
#                         extendedPrice: @unitPrice * @quantity
#                         tax: $store.items[@name].taxable ? $store.tax.rate * @extendedPrice : 0
#             subtotal: (@items.*.extendedPrice).sum()
#             tax: (@items.*.tax).sum()
#             total: @subtotal + @tax
#         """
#         {
#             store:
#                 items:
#                     apples: { price: 1.00, taxable: true }
#                     bananas: { price: 0.25, taxable: true }
#                     oranges: { price: 0.75, taxable: false }
#                 tax:
#                     rate: 0.08
#             order:
#                 name: "Joe Shopper"
#                 items: [
#                     ["apples", 4]
#                     ["bananas", 3]
#                     ["oranges", 1]
#                 ]
#         }
#         {
#             store:
#                 items:
#                     bananas:
#                         price: 0.50
#         }
#         {
#             "name": "Joe Shopper",
#             "items": [
#                 {
#                     "name": "apples",
#                     "quantity": 4,
#                     "unitPrice": 1,
#                     "extendedPrice": 4,
#                     "tax": 0.32
#                 },
#                 {
#                     "name": "bananas",
#                     "quantity": 3,
#                     "unitPrice": 0.5,
#                     "extendedPrice": 1.5,
#                     "tax": 0.12
#                 },
#                 {
#                     "name": "oranges",
#                     "quantity": 1,
#                     "unitPrice": 0.75,
#                     "extendedPrice": 0.75,
#                     "tax": 0
#                 }
#             ],
#             "subtotal": 6.25,
#             "tax": 0.44,
#             "total": 6.69
#         }
#     ]
# ]

# # we test result expressions when the template is executed immmediately.
# # we will generate the tests
# exports.test = tests = {}
# for [source, input, patch, expected] in expressionTests
#     do ->
#         tests[source] = (done) ->
#             ast = ion.parseExpression source
#             e = ion.createRuntime ast, input
#             currentValue = null
#             patchUnwatcher = null
#             checkForMatch = ->
#                 if Object.equal currentValue, expected
#                     patchUnwatcher?()
#                     e.unwatch watcher
#                     done()

#             watcher = (value) ->
#                 console.log 'watcher---------------------------------'
#                 console.log JSON.stringify value
#                 if value isnt currentValue
#                     patchUnwatcher?()
#                     currentValue = value
#                     checkForMatch()
#                     if currentValue? and typeof currentValue is 'object'
#                         patchUnwatcher = require('../patch').watch value, (patch) ->
#                             console.log 'patch---------------------------------'
#                             console.log JSON.stringify value
#                             checkForMatch()
#                 result = value
#             # watch it which causes initial rendering.
#             e.watch watcher
#             # then patch it
#             Object.merge input, patch, true
#             # now the watcher will wait for the changes to propagate
