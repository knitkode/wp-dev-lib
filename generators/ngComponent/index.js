import angular from 'angular';
import service from './service';
import component from './component';

let module = angular.module('<%= name %>', [
])

.service('<%= upCaseName %>', service)
.component('<%= name %>', component)

.name;

export default module;
