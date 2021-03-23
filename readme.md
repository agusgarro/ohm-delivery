
# OHM DELIVERY

server:
I did all the logic in index.js and utils due to time constrain.  I would have like to do it with routes in order for it to be more concise. 
use GET request to find ohm and put to update ohm status. Imported json file to my local mongo.
Was a little bit complicated to understand the logic of the project without proper models and routes, but I did what I could with my knowledge and time restrictions.

web:
I would have liked to use components, but as I work with react and was my first time working with angular I decided to keep it simple and do it in main.js and rendering in html. 
What I could do is connect the web with the server via http request, retrieve all the data from the server, including history of the client and status of the delivery. 

ohm-delivery is a minimalistic project that you have to improve and build. 

The final customer receive the following trackingId `1e62adfe` by email and a link to the tracking page. 

Improve the website to let the customer search for the status of the resistance. When delivered, the customer can acknowledge the delivery (or the failure) of the ordered resistance. 


## How to use:
In web and server directories, type:
```bash
npm run start
```

To run the tests, go to the server directory and type:
```
npm run test
```

## Instructions:

### Web:
* Build the search to query the ohm informations and display the status to the customer.
* Change the UI to finalize the status of the ohm object.
	* Status can either be 'DELIVERED' or 'REFUSED'.
	* If the status is 'REFUSED', ask the customer to provide a little piece of text as a failure reason.

### Server:
* Create a new endpoint to manage the status transition.
	* Status has to be one of the followings: 
		* `'CREATED' -> 'PREPARING' -> 'READY' -> 'IN_DELIVERY' -> 'DELIVERED'|'REFUSED'`.
	* A given status can only go to the next state, therefore only one transition is possible per status. Only exception is 'IN_DELIVERY', which can go to to either 'DELIVERED' or 'REFUSED'.
* If a failure reason is provided, save it.


### Perks:
1. Show more info about the customer or display the ohm history.
2. Improve existing code and project architecture as you wish.
3. Allow user to quickly re-order a ohm with the same specifications.
4. Allow the user to add a comment about the delivery.
5. Change the UI as you wish.