import { L } from "./common";
import { apolloServer } from "./apollo";

/**
 * Use an `async` function to get access to `await` keyword
 */
async function main() {
    // The `listen` method launches a web server.
    const { url } = await apolloServer.listen()
    L.debug(`Server ready at ${url}`);
}

/**
 * Log any uncatched error
 */
main().catch(error => L.error(error));
