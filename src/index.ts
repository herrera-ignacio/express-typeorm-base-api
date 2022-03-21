import "reflect-metadata";
import os from "os";
import cluster from "cluster";
import App from "./providers/App";
import Database from "./providers/Database";

function initSingleNode(): void {
  App.loadServer();
}

// eslint-disable-next-line
function initCluster(): void {
  if (cluster.isPrimary) {
    const CPUS = os.cpus();
    CPUS.forEach(() => cluster.fork());

    /**
     * Run Worker periodically
     */
    setTimeout(() => App.loadWorker(), 1000 * 10);
  } else {
    /**
     * Run the Server on Clusters
     */
    App.loadServer();
  }
}

Database.init().then(() => initSingleNode());

