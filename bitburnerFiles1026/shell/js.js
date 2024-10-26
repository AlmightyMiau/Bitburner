/** @param {NS} ns */
export async function main(ns) {
	ns.tprint(await eval(ns.args[0]));
}