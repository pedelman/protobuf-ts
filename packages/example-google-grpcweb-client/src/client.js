import {AllMethodsRequest} from './service-all-methods_pb';
import {AllMethodsServiceClient} from './service-all-methods_grpc_web_pb';


const client = new AllMethodsServiceClient('http://localhost:5000', null, null);

const request = new AllMethodsRequest();
request.setQuestion('How are you?');

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 1);


client.unary(request, {clientMetaDatum: "hello", deadline: deadline.getTime()}, (err, response) => {
    if (err) {
        console.log(`unary: received error: code = ${err.code}, message = "${err.message}"`);
    } else {
        // console.log(`unary: received response`, response ? response.toObject() : response);
    }
    console.log(`unary: received response`, response ? response.toObject() : response);
});


const responseStream = client.serverStream(request, {clientMetaDatum: "hello", deadline: deadline.getTime()})
responseStream.on('data', (response) => {
    console.log(`serverStream: received response`, response ? response.toObject() : response);
});
responseStream.on('status', (status) => {
    console.log(`serverStream: received status`, status);
});
responseStream.on('error', (err) => {
    console.log(`serverStream: received error: code = ${err.code}, message = "${err.message}"`);
});

