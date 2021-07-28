import { Observable, Observer } from 'rxjs';
const http = require('http');
global.Buffer = global.Buffer || require('buffer').Buffer;
global.process = global.process || require('process');
var eventSource: EventSource;

function getServerSentEvent(url: string): Observable<MessageEvent> {
    return Observable.create((observer: Observer<any>) => {
      console.log("Observer created");
      eventSource = getEventSource(url);
      eventSource.onopen = (ev: any) => {
        console.log('Connection to server opened.', ev);
      };
      eventSource.onerror = (ev: any) => {
        console.log('EventSource failed.', ev);
        eventSource.close();
      };
      eventSource.addEventListener('message', (event: any) => {
          console.log("event received");
          console.log(JSON.parse(event.data));
      });
    });
  }
  

function getEventSource(url: string): EventSource {
    if (eventSource) {
      console.log('EventSource closed.');
      eventSource.close();
    }
    eventSource = new EventSource(url);
    console.log("Event source created");
    console.log(eventSource);
    return eventSource;
  
}

function makeHttpReq(){ 
    console.log("making request");

    const req = http.get(
      {
        host: 'localhost',
        port: 8080,
        path: '/api/jsonflow',
        method: 'GET',
      },
      (response: any) => {
        console.log("stream started");
        response.setEncoding('utf8');
        response.on("data",(data: any) =>{
          console.log(data);
        })
        response.on("end",(data: any) =>{
          console.log("stream ended");
        })
      }
    );
  }


  makeHttpReq();
  const observable = getServerSentEvent("http://localhost:8080/api/stringflow");
  observable.subscribe();
