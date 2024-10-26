/** @param {NS} ns */
export async function main(ns) {
	//const call = ns.args[0];
	const call = "hack";
	const server = ns.args[0];
	// if (ns.args[0] === undefined || ns.args[1] === undefined || ns.args[0] == "help") {
	// 	ns.tprint("1st arg is the call type; ie. hack, weaken, or grow\n2nd arg is the server name");
	// }

	if (call == "hack") {
		ns.tprint(ns.hackAnalyzeThreads(server, ns.getServerMoneyAvailable(server)));
	}
}