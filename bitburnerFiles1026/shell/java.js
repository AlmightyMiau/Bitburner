/** @param {NS} ns 
 * @link {RunOptions} ro
*/

// run as 
// 		java 'FUNCTION'
export async function main(ns) {
	ns.exec("shell/js.js", "home", {threads:1, ramOverride:32}, ns.args[0])
}