var avro = require('avro-js');
// avro.createFileDecoder('./avro/users.avro')
//     .on('metadata', function (type) { /* `type` is the writer's type. */ })
//     .on('data', function (record){
//         console.log(record)
//     });
var type = avro.parse({
    name: 'Pet',
    type: 'record',
    fields: [
        {name: 'kind', type: {name: 'Kind', type: 'enum', symbols: ['CAT', 'DOG']}},
        {name: 'name', type: 'string'}
    ]
});
var pet = {kind: 'CAT', name: 'Albert'};
var buf = type.toBuffer(pet); // Serialized object.
var obj = type.fromBuffer(buf); // {kind: 'CAT', name: 'Albert'}
console.log(buf);