import BaseRoute from "../../base/BaseRoute";
import HomeController from "@root/app/basic/controllers/HomeController";
import ImportHttpListener from "@root/app/broadcast/controllers/ImportHttpListener";
import ExportListenerController from "@root/app/broadcast/controllers/events/ExportListenerController";

export default BaseRoute.extend<BaseRouteInterface>({
  baseRoute: '',
  onready() {
    let self = this;
    self.use('/', [], function (route: BaseRouteInterface) {
      route.get('', 'front.index', [], HomeController.binding().index);
    });
    self.use('/import', [], function (route: BaseRouteInterface) {
      route.post('/fetch', 'import.fetch_data', [], ImportHttpListener.binding().fetchData);
      route.post('/pull', 'import.pull_data', [], ImportHttpListener.binding().pullData);
      route.post('/install', 'import.install_data', [], ImportHttpListener.binding().installData);
    });
    self.use('/export', [], function (route: BaseRouteInterface) {
      route.post('stage', 'export.stage_data', [], ExportListenerController.binding().stageData);
      route.post('push', 'export.push_data', [], ExportListenerController.binding().pushData);
    });
  }
});