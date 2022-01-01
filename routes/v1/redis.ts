import BaseRoute from "../../base/BaseRoute";
import ImportListenerController from "@root/app/broadcast/controllers/events/ImportListenerController";
import ExportListenerController from "@root/app/broadcast/controllers/events/ExportListenerController";
export default BaseRoute.extend<BaseRouteInterface>({
  onready(): void {
    let self = this;
    self.useNrp('info', function (route: BaseRouteInterface) {
      route.nrpOn('import.fetch_data', ImportListenerController.binding().fetchData);
      route.nrpOn('import.pull_data', ImportListenerController.binding().pullData);
      route.nrpOn('import.install_data', ImportListenerController.binding().installData);

      route.nrpOn('export.fetch_data', ExportListenerController.binding().stageData);
      route.nrpOn('export.push_data', ExportListenerController.binding().pushData);
    });
  }
});