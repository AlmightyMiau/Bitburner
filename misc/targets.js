/** @param {NS} ns */
export async function main(ns) {
	ns.clear("moneyServers.txt");
	const servers = netscan(ns);
	for (let i = 0; i < servers.length; i++) {
		if (ns.getServer(servers[i]).moneyMax > 0) {
			ns.write("moneyServers.txt", servers[i], "a");
			ns.write("moneyServers.txt", "\n", "a");
		}
	}
	
}

/** @param {NS} ns */
function netscan(ns) {
	//Initialize the set and seed it with the a host so that the next line
	//has something to work with.
	let hosts = new Set(["home"]);

	//Sets have the useful property that when elements are added to them in
	//their own forEach loop, they will iterate over those new elements as
	//well. Be careful about this with other data structures and languages!
	//It is somewhat uncommon for data structures to tolerate manipulation
	//during iteration.
	//Anyway, because of this, we can add new neighbors to the set as we
	//find them, and they will be scanned as well.
	//We also don't have to check if the set already contains the host,
	//because sets are sets of unique elements. The underlying structure of
	//a set typically makes it impossible to add duplicate elements at all.
	hosts.forEach(h => { ns.scan(h).forEach(n => hosts.add(n)); });

	//Sets are irritating to work with in list contexts, because concepts
	//like sorting are inapplicable to them (e.g. you might want to sort
	//these servers by difficulty). So we convert it back to a list.
	//If you look at the printed output, you might notice that the order
	//appears to be similar to the order in which the servers were scanned.
	//Do not rely on this behavior! It is purely a side effect of the
	//implementation of the set. A set has no concept of "order" and a
	//change in its implementation (or a new compiler optimization) could
	//produce a different order.
	//Of course, you might ask how it is the above "forEach" loop works if
	//the set has no order. The answer is... uh oh, something is wrong with
	//the b1^n&de... do you feel it? Run... save yourself...
	return Array.from(hosts);
}