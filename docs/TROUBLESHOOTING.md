# Troubleshooting

## 1.1 Indentation with pug and vscode

- [x] FIXME: Invalid indentation, you can use tabs or spaces but not both

This issue seems to happen a lot with vscode users:

```shell
Error: .../populairy/week-4/views/popup.pug:5:1
    3| block content
    4|  h1 #{popups.length} Pop-up(s) listed and counting...
  > 5|   h2 Pop-up Details:
-------^
    6|  each popup in popups
    7|          li #{popup.title} performed by #{popup.host}
    8|          p Organizers:

Invalid indentation, you can use tabs or spaces but not both
```

It seems something is conflicting at the moment. Tried this out but it does not work at the moment:

```json
{
    "editor.tabSize": 4,
    "editor.detectIndentation": false
}
```
https://github.com/Microsoft/vscode/issues/15316

Solution:

- As a workaround I installed a `Pug beautify` for VSCode that I run at the end.

## 1.2 Can not overwrite model once compiled

- [x] FIXME: overwriting error: 'Cannot overwrite `Popup` model once compiled.'

```javascript
// popup-service.js
const Popup = mongoose.model('Popup', popupSchema);
module.exports = Popup;

// current workaround:
module.exports =
  mongoose.models && mongoose.models.Popup
    ? mongoose.models.Popup
    : mongoose.model('Popup', popupSchema);
```

## 1.3 Casting error on ObjectID

- [ ] FIXME: Popup validation failed: eventHost: Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"

This happens when trying to seed new records (event, popup) that have a reference to the other model.

```js
// Event.js (Event Schema)
eventHost: {
  name: String,
  firstName: String,
  lastName: String,
},
```

```js
// Popup.js (Pop-up Schema)
eventHost: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Event',
  autopopulate: {
  maxDepth: 1,
},
},
```

```js
// seedAllModels.js: Seed events, popups, persons initially
eventHost: {
  name: 'Food Coop Berlin',
},
```

### Error output:
```
ERROR while seeding DB with persons Error [ValidationError]: Popup validation failed: eventHost: Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"
    at ValidationError.inspect (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/error/validation.js:61:24)
    at formatValue (internal/util/inspect.js:563:31)
    at inspect (internal/util/inspect.js:221:10)
    at formatWithOptions (internal/util/inspect.js:1693:40)
    at Object.Console.<computed> (internal/console/constructor.js:272:10)
    at Object.log (internal/console/constructor.js:282:61)
    at seedPersons (/Users/thuyle/workspace/private/thuy/populairy/week-5/bin/07_seedAllModels.js:319:13)
    at processTicksAndRejections (internal/process/task_queues.js:93:5) {
  errors: {
    eventHost: MongooseError [CastError]: Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"
        at new CastError (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/error/cast.js:29:11)
        at model.$set (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:1195:9)
        at model._handleIndex (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:934:14)
        at model.$set (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:878:22)
        at model.Document (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/document.js:136:12)
        at model.Model (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/model.js:97:12)
        at new model (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/model.js:4425:15)
        at seedPersons (/Users/thuyle/workspace/private/thuy/populairy/week-5/bin/07_seedAllModels.js:111:24)
        at processTicksAndRejections (internal/process/task_queues.js:93:5) {
      message: `Cast to ObjectID failed for value "{ name: 'Mona Lisa Complot' }" at path "eventHost"`,
      name: 'CastError',
      stringValue: `"{ name: 'Mona Lisa Complot' }"`,
      kind: 'ObjectID',
      value: [Object],
      path: 'eventHost',
      reason: [MongooseError]
    }
  },
  _message: 'Popup validation failed',
  name: 'ValidationError'
  ```

## 1.4 Casting error on `required:true` set in Event Schema

- [x] FIXME: Cast to ObjectId failed for value "new" at path "_id" for model "Event"

Description:

- on POST method when trying to create a new event with required fields set to true I get cast error.
- expected behavior: it should allow me to create a new event if i fill in the required fields correctly.
- actual behavior:
	- it does not allow me to create a new event if i fill in the required fields correctly. It shows me the error messages of the required fields: `Event name can't be blank.`
	- it jumps into GET method (instead of POST method) and tries to find item by id but passing in `new` and therefore returns a casting error

no required fields set

- expected behavior: if i remove the required validations from the schema fields it should create a new event with all key-value-pairs i provide.
- actual behavior: it creates a new event and omits all the properties that did not have the `required:true`

```shell
[base-service.js findById()]: itemId new
Error while loading event MongooseError [CastError]: Cast to ObjectId failed for value "new" at path "_id" for model "Event"
    at new CastError (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/error/cast.js:29:11)
    at ObjectId.cast (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/schema/objectid.js:246:11)
    at ObjectId.SchemaType.applySetters (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/schematype.js:969:12)
    at ObjectId.SchemaType._castForQuery (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/schematype.js:1383:15)
    at ObjectId.SchemaType.castForQuery (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/schematype.js:1373:15)
    at ObjectId.SchemaType.castForQueryWrapper (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/schematype.js:1352:15)
    at cast (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/cast.js:315:32)
    at model.Query.Query.cast (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/query.js:4644:12)
    at model.Query.Query._castConditions (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/query.js:1842:10)
    at model.Query.<anonymous> (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/query.js:2097:8)
    at model.Query._wrappedThunk [as _findOne] (/Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/mongoose/lib/helpers/query/wrapThunk.js:16:8)
    at /Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/kareem/index.js:278:20
    at /Users/thuyle/workspace/private/thuy/populairy/week-5/node_modules/kareem/index.js:77:15
    at processTicksAndRejections (internal/process/task_queues.js:75:11) {
  message: 'Cast to ObjectId failed for value "new" at path "_id" for model "Event"',
  name: 'CastError',
  stringValue: '"new"',
  kind: 'ObjectId',
  value: 'new',
  path: '_id',
  reason: undefined,
  model: Model { Event }
```

Solution:

- Use [express-validator](https://www.npmjs.com/package/express-validator) and create a separate function to validate the schema fields in `controllers/eventsController.js`. This way you have a clean and adjustable function for validations.