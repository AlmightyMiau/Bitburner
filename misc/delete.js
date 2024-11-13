/** @param {NS} ns */
export async function main(ns) {
	let serv = ns.args[0];
	if (!(serv === undefined)) {
		ns.deleteServer(serv);
	} else {
		ns.tprint("Server does not exist");
	}
}	

// Take argument for which server name to delete