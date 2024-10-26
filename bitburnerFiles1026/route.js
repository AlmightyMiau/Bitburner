const HOME = "home";
let target;
export async function main(ns) {
    let result = [];
    let route = [];
    let seen = [];
    target = ns.args[0]; // The target server
    let backdoor = ns.args[1]; // True for connecting to the server and backdooring
    if (target === undefined) {
        ns.tprint("No target server specified");
        ns.exit();
    }
    if (buildRoute(ns, HOME, route, seen)) {
        result = await printRoute(ns, route);
    }
}
function buildRoute(ns, parent, route, seen) {
    //first time we run we need to add the parent to the list of servers we've seen
    if (!seen.includes(parent))
        seen.push(parent);
    //add to route
    route.push(parent);
    const children = ns.scan(parent);
    for (const child of children) {
        if (seen.includes(child)) {
            //already checked
            continue;
        }
        seen.push(child);
        if (child == target) {
            //found  add it to the route and finish recursion
            route.push(child);
            return true;
        }
        if (buildRoute(ns, child, route, seen)) {
            //target found, finish recursion
            return true;
        }
        else {
            //target not found in this branch, remove from route
            route.pop();
        }
    }
    //didn't find target in this route, reset route
    route = [];
    return false;
}
async function printRoute(ns, route) {
    let result = [];
    for (const node of route) {
        result.push(node);
    }
    result.push('backdoor');
    // await navigator.clipboard.writeText(result);
    ns.tprint(result);
    return result;
}