webpackJsonp([2],{

/***/ 104:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    //    app.controller('ChangePasswordController', ChangePasswordController);

	    //    ChangePasswordController.$inject = ['$scope', '$state', 'toaster', 'LoginService'];

	    function ChangePasswordController($http, $scope, $state, toaster, FFD_CONST, LoginService) {

	        var vm = this;
	        vm.history = [];

	        var request = $http({
	            method: "post",
	            url: FFD_CONST.API_BASE_URL + "GetPasswordsHistory",
	            data: {}
	        });

	        request.success(function (data, status, headers, config) {
	            vm.history = data.d;
	        });
	    }
	    ChangePasswordController.$inject = ["$http", "$scope", "$state", "toaster", "FFD_CONST", "LoginService"];

	    return ChangePasswordController;
	};

/***/ },

/***/ 121:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function _AllUsersController($scope, $q, $timeout,

	    //         $sessionStorage,  $http, 

	    $localStorage, $state, $location, $http, _, FFD_CONST, toaster, uiGridConstants, uiGridExporterConstants, uiGridPaginationService, LoginService,
	    //        InfoFactory,
	    //        ChoicesFactory,
	    //          GetResultsFactory,
	    AdminDataService, ToolsService) {

	        var _filters_default = {
	            username: '',
	            email: '',
	            city: '',
	            address: '',

	            firstname: '',
	            lastname: '',

	            haspassword: false,
	            isadmin: false,
	            issuperadmin: false,
	            status: 'all',
	            subscr_status: 'all',
	            payment: 'all',

	            date_la_start_: undefined,
	            date_la_end_: undefined,
	            date_la_start: '',
	            date_la_end: '',

	            date_reg_start_: undefined,
	            date_reg_end_: undefined,
	            date_reg_start: '',
	            date_reg_end: '',

	            date_subcre_start_: undefined,
	            date_subcre_end_: undefined,
	            date_subcre_start: '',
	            date_subcre_end: '',

	            date_subend_start_: undefined,
	            date_subend_end_: undefined,
	            date_subend_start: '',
	            date_subend_end: '',

	            date_subrealend_start_: undefined,
	            date_subrealend_end_: undefined,
	            date_subrealend_start: '',
	            date_subrealend_end: ''

	        };

	        var _username = '';
	        var vm = this;
	        var _restore_name = "AllUsers_Restore_Params";
	        var _restore_name_columns = "AllUsers_Restore_Columns";

	        /*
	          vm.phistory = [];
	            var request = $http({
	            method: "post",
	            url: FFD_CONST.API_BASE_URL + "GetPasswordsHistory",
	            data: {}
	        });
	              request
	        .success(function (data, status, headers, config) {
	            vm.phistory = data.d;
	        });
	          */

	        vm.getabsurl = function (_url) {
	            var _start = $location.protocol() + '://' + $location.host() + ':' + $location.port();
	            return _start + _url;
	        };

	        vm.excel_url = "";

	        vm.LoadingActive = false;

	        $scope.$on('cfpLoadingBar:started', function (event, data) {
	            $timeout(function () {
	                vm.LoadingActive = screenfull && screenfull.isFullscreen;
	            });
	            console.log('cfpLoadingBar:started');
	        });

	        $scope.$on('cfpLoadingBar:completed', function (event, data) {
	            $timeout(function () {
	                vm.LoadingActive = false;
	            });
	            console.log('cfpLoadingBar:completed');
	        });

	        vm.show_filters = false;
	        vm.show_details = false;
	        vm.filters = angular.merge({}, _filters_default, { subscr_status: 'active' });

	        function raw_date_2_str(raw_) {
	            return raw_ == undefined ? '' : moment(raw_).format('MM/DD/YYYY');
	        }

	        $scope.$watch('vm.filters.date_la_start_', function () {
	            vm.filters.date_la_start = raw_date_2_str(vm.filters.date_la_start_);
	        });

	        $scope.$watch('vm.filters.date_la_end_', function () {
	            vm.filters.date_la_end = raw_date_2_str(vm.filters.date_la_end_);
	        });

	        $scope.$watch('vm.filters.date_reg_start_', function () {
	            vm.filters.date_reg_start = raw_date_2_str(vm.filters.date_reg_start_);
	        });

	        $scope.$watch('vm.filters.date_reg_end_', function () {
	            vm.filters.date_reg_end = raw_date_2_str(vm.filters.date_reg_end_);
	        });

	        $scope.$watch('vm.filters.date_subcre_start_', function () {
	            vm.filters.date_subcre_start = raw_date_2_str(vm.filters.date_subcre_start_);
	        });

	        $scope.$watch('vm.filters.date_subcre_end_', function () {
	            vm.filters.date_subcre_end = raw_date_2_str(vm.filters.date_subcre_end_);
	        });

	        $scope.$watch('vm.filters.date_subend_start_', function () {
	            vm.filters.date_subend_start = raw_date_2_str(vm.filters.date_subend_start_);
	        });

	        $scope.$watch('vm.filters.date_subend_end_', function () {
	            vm.filters.date_subend_end = raw_date_2_str(vm.filters.date_subend_end_);
	        });

	        $scope.$watch('vm.filters.date_subrealend_start_', function () {
	            vm.filters.date_subrealend_start = raw_date_2_str(vm.filters.date_subrealend_start_);
	        });

	        $scope.$watch('vm.filters.date_subrealend_end_', function () {
	            vm.filters.date_subrealend_end = raw_date_2_str(vm.filters.date_subrealend_end_);
	        });

	        /*        $scope.$watch('vm.crnt_row.UserId', function () {
	        
	                    vm.crnt_row.leftcount = "";
	                    AdminDataService.getUserInfo4Id(vm.crnt_row.UserId)
	                    .then(function (_data) { vm.crnt_row.leftcount = _data.leftCount });
	        
	        
	        
	                });
	        */

	        vm.crnt_row = {};
	        vm.phist = { password: '', password_prev: '' };

	        vm.gridOptions = {};

	        vm.gridOptions.exporterMenuCsv = false;
	        vm.gridOptions.exporterMenuPdf = false;

	        vm.gridOptions.exporterCsvFilename = 'users.csv';
	        //        vm.gridOptions.exporterCsvLinkElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
	        vm.gridOptions.exporterAllDataFn = function () {
	            //            alert('ALL');
	            return vm.getPage(1, vm.gridOptions.totalItems, false).then(function () {});
	        };

	        vm.gridOptions.appScopeProvider = vm;
	        vm.gridOptions.useExternalSorting = true;
	        vm.gridOptions.enablePinning = true;

	        //        vm.gridOptions.data = '_records';
	        vm.gridOptions.enableColumnResizing = true;
	        vm.gridOptions.enableFiltering = false;
	        vm.gridOptions.useExternalFiltering = true;

	        vm.gridOptions.enableGridMenu = true;
	        vm.gridOptions.showGridFooter = false;
	        //        vm.gridOptions.fastWatch = true;

	        vm.gridOptions.showColumnFooter = false;
	        vm.gridOptions.showFooter = false;
	        vm.gridOptions.enablePaginationControls = true;

	        vm.gridOptions.paginationPageSizes = [10, 25, 50, 100, 200];
	        vm.gridOptions.paginationPageSize = 25; // 200;
	        vm.gridOptions.useExternalPagination = true;

	        var boolColTemplate = '<div class="text-xs-center">{{COL_FIELD == true  ? "+" : ""}}</div>';

	        boolColTemplate = __webpack_require__(122);

	        vm._columnDefs = [{
	            name: 'xxx',
	            displayName: ' ',
	            cellTemplate: __webpack_require__(123),
	            width: 40,
	            enableFiltering: false,
	            enableHiding: false,
	            enableSorting: false,
	            pinnedLeft: true
	            //                    , enablePinning: true
	            //                   , pinnable: true
	        }, {
	            name: 'UserName', displayName: 'Login', visible: true, width: 150,
	            enableFiltering: true
	            //,enableSorting: false
	            //                    , cellTemplate: require('./details.tpl.html')
	            , pinnedLeft: true
	            //                    , enablePinning: true
	            //                   , pinnable: true
	        }, { name: 'UserId', displayName: 'User ID', visible: false, width: 150, enableFiltering: false, enableSorting: true },

	        /*
	        {
	            name: 'yyy', displayName: 'Name(1st&last)', visible: true,
	            width: 250
	            , cellTemplate: require('./name-column.tpl.html')
	        },
	        */

	        { name: 'FirstName', displayName: 'First Name', visible: true, width: 150 }, { name: 'LastName', displayName: 'Last Name', visible: true, width: 150 }, { name: 'Password', displayName: 'Password', visible: true, width: 150, enableSorting: true }, { name: 'Email', displayName: 'E-mail', visible: true, width: 200, enableFiltering: false, enableSorting: true }, { name: 'CreateDate', displayName: 'Registration Date', visible: true, width: 200 }, { name: 'LastActivityDate', displayName: 'Last Activity', visible: true, width: 150 }, { name: 'SubscrStatus', displayName: 'Subscriber Status', visible: true, width: 150 }, { name: 'SubscrCreate', displayName: 'Subscription Create Date', visible: true, width: 200 }, { name: 'SubscrEnd', displayName: 'Subscription End Date', visible: true, width: 200 }, { name: 'SubscrRealEnd', displayName: 'Subscription Actual End Date', visible: true, width: 200 }, { name: 'SubscrCancel', displayName: 'Subscription Cancel Date', visible: true, width: 200 }, { name: 'SubscrType', displayName: 'Payment Type', visible: true, width: 150 }, { name: 'total_subscr_days', displayName: 'Total Subscription Days', visible: true, width: 150 }, { name: 'net_worth', displayName: 'Net Worth', visible: true, width: 80, cellFilter: 'currencyFilter' }, { name: 'Address', visible: true, width: 200, enableFiltering: false /*  , enableSorting: false */ }, { name: 'City', visible: true, width: 100, enableFiltering: false }, { name: 'State', visible: true, width: 50, enableFiltering: false }, { name: 'Zip', visible: true, width: 150 }, { name: 'BusinessType', DysplayName: 'Business Type', visible: true, width: 200 }, {
	            name: 'IsAdmin',
	            displayName: 'Admin',
	            cellTemplate: boolColTemplate // require('./admin-column.tpl.html')
	            , width: 100
	        }, {
	            name: 'IsSuperAdmin',
	            displayName: 'Super Admin',
	            cellTemplate: boolColTemplate // require('./admin-column.tpl.html')
	            , width: 100
	        }, {
	            name: 'IsActive',
	            displayName: 'Active',
	            cellTemplate: boolColTemplate // require('./active-column.tpl.html')
	            , width: 100
	        }];

	        vm.gridOptions.columnDefs = vm._columnDefs;

	        vm.gridOptions.data = [];

	        vm.saveState = function () {
	            $localStorage[_restore_name_columns] = vm.gridApi.saveState.save();
	            console.log('columns state saved');
	        };

	        vm.restoreState = function () {
	            if (!$localStorage[_restore_name_columns]) return;
	            vm.gridApi.saveState.restore(vm, $localStorage[_restore_name_columns]);
	            console.log('columns state restored');
	        };

	        vm.rerun = function ($event, _row) {
	            $event.preventDefault();
	            console.log(_row);
	        };

	        vm.detail = function ($event, _row) {
	            $event.preventDefault();
	            vm.crnt_row = _row;
	            vm.show_detail = true;
	        };

	        vm.next_user = function () {
	            var _indx = _.findIndex(vm.gridOptions.data, function (_itm) {
	                return _itm.UserId == vm.crnt_row.UserId;
	            });
	            if (_indx < 0) return;
	            if (_indx + 1 < vm.gridOptions.data.length) {
	                vm.crnt_row = vm.gridOptions.data[_indx + 1];
	                return;
	            }
	            if (vm.gridOptions.paginationCurrentPage + 1 > vm.gridApi.pagination.getTotalPages()) return;
	            vm.gridOptions.paginationCurrentPage++;
	            vm.getPage(vm.gridOptions.paginationCurrentPage, vm.gridOptions.paginationPageSize, false).then(function () {
	                vm.crnt_row = vm.gridOptions.data[0];
	            });
	        };

	        vm.prev_user = function () {
	            var _indx = _.findIndex(vm.gridOptions.data, function (_itm) {
	                return _itm.UserId == vm.crnt_row.UserId;
	            });
	            if (_indx < 0) return;
	            if (_indx > 0) {
	                vm.crnt_row = vm.gridOptions.data[_indx - 1];
	                return;
	            }
	            if (vm.gridOptions.paginationCurrentPage == 1) return;
	            vm.gridOptions.paginationCurrentPage--;
	            vm.getPage(vm.gridOptions.paginationCurrentPage, vm.gridOptions.paginationPageSize, false).then(function () {
	                vm.crnt_row = vm.gridOptions.data[vm.gridOptions.data.length - 1];
	            });
	        };

	        vm.get_sort = function () {
	            var _sortm = [];
	            var _v_sortm = [];
	            if (!$localStorage[_restore_name_columns]) return _sortm;
	            var _func_item = function _func_item(_itm) {
	                if (typeof _itm.sort == 'undefined') return;
	                if (typeof _itm.sort.direction == 'undefined') return;
	                var _indx = _.findIndex(_sortm, { name: _itm.name });
	                if (_indx > -1) {
	                    _sortm[_indx].sort = _itm.sort;
	                    _sortm[_indx].direction = _itm.sort.direction;
	                    _sortm[_indx].priority = _itm.sort.priority;
	                    return;
	                }
	                _sortm.push({ name: _itm.name, sort: _itm.sort, direction: _itm.sort.direction, priority: _itm.sort.priority });
	            };

	            var _func_item2 = function _func_item2(_itm) {
	                var _nitem = { name: _itm.name, direction: _itm.direction, priority: _itm.sort.priority };
	                var _ditem = _.find(vm._columnDefs, { name: _itm.name });
	                if (_ditem && _ditem.displayName) _nitem.name = _ditem.displayName;
	                _v_sortm.push(_nitem);
	            };

	            var _columns = $localStorage[_restore_name_columns].columns;
	            _.forEach(_columns, _func_item);
	            _.forEach(_sortm, _func_item2);
	            _v_sortm = _.sortByOrder(_v_sortm, ['priority'], [true]);

	            vm.ind_sortm = _v_sortm;

	            //_.forEach(vm.gridApi.grid.columns, _func_item);
	            //            _.forEach(vm.gridOptions.columnDefs, _func_item);
	            console.log(_sortm, _v_sortm);
	            return _sortm;
	        };

	        vm.get_filters = function () {
	            var _cond = [];

	            if (vm.filters.username) _cond.push(['username', vm.filters.username]);
	            if (vm.filters.email) _cond.push(['email', vm.filters.email]);
	            if (vm.filters.address) _cond.push(['address', vm.filters.address]);
	            if (vm.filters.city) _cond.push(['city', vm.filters.city]);
	            if (vm.filters.isadmin) _cond.push(['isadmin', 'true']);
	            if (vm.filters.issuperadmin) _cond.push(['issuperadmin', 'true']);
	            if (vm.filters.haspassword) _cond.push(['haspassword', 'true']);

	            if (vm.filters.firstname) _cond.push(['firstname', vm.filters.firstname]);
	            if (vm.filters.lastname) _cond.push(['lastname', vm.filters.lastname]);

	            if (vm.filters.date_la_start) _cond.push(['date_la_start', vm.filters.date_la_start]);
	            if (vm.filters.date_la_end) _cond.push(['date_la_end', vm.filters.date_la_end]);

	            if (vm.filters.date_reg_start) _cond.push(['date_reg_start', vm.filters.date_reg_start]);
	            if (vm.filters.date_reg_end) _cond.push(['date_reg_end', vm.filters.date_reg_end]);

	            if (vm.filters.date_subcre_start) _cond.push(['date_subcre_start', vm.filters.date_subcre_start]);
	            if (vm.filters.date_subcre_end) _cond.push(['date_subcre_end', vm.filters.date_subcre_end]);

	            if (vm.filters.date_subend_start) _cond.push(['date_subend_start', vm.filters.date_subend_start]);
	            if (vm.filters.date_subend_end) _cond.push(['date_subend_end', vm.filters.date_subend_end]);

	            if (vm.filters.date_subrealend_start) _cond.push(['date_subrealend_start', vm.filters.date_subrealend_start]);
	            if (vm.filters.date_subrealend_end) _cond.push(['date_subrealend_end', vm.filters.date_subrealend_end]);

	            if (vm.filters.status != 'all') _cond.push(['status', vm.filters.status]);
	            if (vm.filters.payment != 'all') _cond.push(['payment', vm.filters.payment]);
	            if (vm.filters.subscr_status != 'all') _cond.push(['subscr_status', vm.filters.subscr_status]);

	            return _cond;
	        };

	        vm.save_state_grid = function () {
	            $localStorage[_restore_name] = {
	                filters: vm.filters,
	                //                sort: vm.get_sort(),
	                pagesize: vm.gridOptions.paginationPageSize,
	                page: vm.gridOptions.paginationCurrentPage,
	                username: vm.crnt_row.UserName,
	                isFullScreen: screenfull && screenfull.isFullscreen
	            };
	        };

	        vm.edit_user = function () {
	            vm.save_state_grid();
	            $state.go("profile.changepersonaldata", { username: vm.crnt_row.UserName, backto: 'admin.allusers' });
	        };

	        vm.delete_user = function () {
	            vm.save_state_grid();

	            LoginService.deleteuser(vm.crnt_row.UserId).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    var _message = vm.crnt_row.UserName + ' has been deleted';
	                    toaster.pop('success', _message);
	                }
	                activate();
	            });
	        };

	        vm.unsubscribe = function ($event) {
	            LoginService.unsubscribe(vm.crnt_row.UserId).then(function (data) {
	                if (data.result == "OK") {
	                    vm.done = true;
	                }
	                if (data.result == "ERROR") {
	                    toaster.pop('error', data.message);
	                }
	            });
	        };

	        vm.unsubscribe_wo_email = function ($event) {
	            LoginService.unsubscribe_wo_email(vm.crnt_row.UserId).then(function (data) {
	                if (data.result == "OK") {
	                    vm.done = true;
	                }
	                if (data.result == "ERROR") {
	                    toaster.pop('error', data.message);
	                }
	            });
	        };

	        vm.browse_orders = function () {
	            vm.save_state_grid();

	            //            $state.go("profile.orderhistory", { username: vm.crnt_row.UserName, backto: 'admin.allusers' });
	            $state.go("admin.orders", { username: vm.crnt_row.UserName, backto: 'admin.allusers' });
	        };

	        vm.browse_queries = function () {
	            vm.save_state_grid();

	            $state.go("admin.queries", { username: vm.crnt_row.UserName, backto: 'admin.allusers' });
	        };

	        vm.reset_password = function () {

	            vm.save_state_grid();

	            LoginService.resetpassword(vm.crnt_row.UserName).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    var _message = 'New password has been sent to ' + vm.crnt_row.Email;
	                    toaster.pop('success', _message);
	                }
	                activate();
	            });
	        };

	        vm.change_admin = function () {
	            vm.save_state_grid();

	            LoginService.switchadminrole(vm.crnt_row.UserId).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    activate();
	                }
	            });
	        };

	        vm.change_superadmin = function () {
	            vm.save_state_grid();

	            LoginService.switchsuperadminrole(vm.crnt_row.UserId).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    activate();
	                }
	            });
	        };

	        vm.change_active = function () {
	            vm.save_state_grid();

	            LoginService.switchactiveuser(vm.crnt_row.UserId).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    activate();
	                }
	            });
	        };

	        vm.change_scount = function () {

	            AdminDataService.getUserInfo4Id(vm.crnt_row.UserId).then(function (_data) {
	                console.log("vm.crnt_row.UserId=", vm.crnt_row.UserId, "_data.leftCount=", _data.leftCount);
	                AdminDataService.ChangeSubscriptionCount(vm.crnt_row.UserId, _data.leftCount);
	            });
	        };

	        /*
	                vm.send_exp_email = function ()
	                {
	                    var request = $http({
	                        method: "post",
	                        url: FFD_CONST.API_BASE_URL + "SendMail_Base_M_Wrap",
	                        data: {
	                            _email: vm.crnt_row.Email,
	                            _subject: "FreshFind Data Subscription",
	                            _master: "",
	                            _template: "ExpirationSubscription.html",
	                            _params: [["FirstName", vm.crnt_row.FirstName], ["LastName", vm.crnt_row.LastName]],
	                            _isBCC: true
	                            }
	                    });
	        */

	        vm.send_exp_email = function () {
	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "Send_Embedded_Mail",
	                data: {
	                    _email: vm.crnt_row.Email,
	                    _subject: "",
	                    _name_report: "ExpirationSubscription",
	                    _params: [["FirstName", vm.crnt_row.FirstName], ["LastName", vm.crnt_row.LastName], ["ExpirationSubscriptionUrl", "https://www.freshfinddata.com/profile/changecreditcarddata"]],
	                    _isBCC: true
	                }
	            });

	            request.success(function (data, status, headers, config) {
	                var _resp = data.d;
	                if (_resp.result == "OK") {
	                    var _msg = "E-mail was sent to " + vm.crnt_row.Email;
	                    toaster.pop('success', _msg);
	                } else {
	                    var _msg = _resp.message ? _resp.message : "Unknokwn Error";
	                    toaster.pop('error', data.message);
	                }
	            });
	        };

	        //        vm.gridOptions.rowIdentity = function (row) { return row.UserId;     };
	        //        vm.gridOptions.getRowIdentity = function (row) { return row.UserId;  };

	        vm.gridOptions.onRegisterApi = function (gridApi) {
	            vm.gridApi = gridApi;
	            //            _afterregisterApi();
	            activate();
	            /*
	             
	             */
	        };

	        function _afterregisterApi(gridApi) {
	            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
	                if (vm.getPage) {
	                    vm.getPage(newPage, pageSize, false).then(function () {});
	                }
	            });
	            gridApi.core.on.filterChanged($scope, function () {
	                /*
	                var grat = 778;
	                _uname=this.grid.columns[3].filters[0].term
	                vm.gridOptions.data = [];
	                */
	            });
	            gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
	                /*
	                var _cols = _.map(sortColumns, function (_item) { return { name: _item.name, sort: _item.sort.direction }; });
	                  console.log("sortColumns>> ", sortColumns);
	                console.log("_cols >> ", _cols);
	                */
	                vm.saveState();
	                vm.getPage(vm.gridOptions.paginationCurrentPage, vm.gridOptions.paginationPageSize, true).then(function () {});
	            });
	            $state.current.onExit = function () {
	                vm.saveState();
	            };
	            vm.gridApi.core.on.columnVisibilityChanged($scope, function (column) {
	                vm.saveState();
	            });
	        }

	        //        ??????????
	        vm.reset_sorting = function ($event) {
	            $event.preventDefault();

	            var _func_item = function _func_item(_col) {
	                delete _col.sort.direction;
	                delete _col.sort.priority;
	            };

	            _.forEach(vm.gridApi.grid.columns, _func_item);

	            vm.saveState();
	            vm.getPage(vm.gridOptions.paginationCurrentPage, vm.gridOptions.paginationPageSize, true).then(function () {});
	        };

	        vm.filters_apply = function () {
	            vm.show_filters = false;
	            vm.getPage(1, vm.gridOptions.paginationPageSize, true).then(function () {});
	        };

	        vm.filters_clear = function () {
	            vm.show_filters = false;
	            vm.filters = angular.merge({}, _filters_default);
	            vm.getPage(1, vm.gridOptions.paginationPageSize, true).then(function () {});
	        };

	        vm.is_refresh = false;

	        vm.refresh_0 = function () {
	            //            return;
	            //            vm.gridOptions.paginationPageSize = 10;
	            //            vm.is_refresh = true;
	            $timeout(function () {
	                //                vm.gridOptions.paginationPageSize = 200;
	                //                vm.is_refresh = false;
	                vm.gridApi.grid.refresh();
	            }, 800);
	        };

	        vm.refresh = function () {
	            vm.is_refresh = true;
	            $timeout(function () {
	                //                _.find(vm.gridOptions.columnDefs, { name: "UserId" }).visible = false;
	                var _set_visible = function _set_visible(_item) {
	                    var _dev = _.find(vm._columnDefs, { name: _item.name });
	                    if (!_dev) return;
	                    var _visible = _dev.visible ? !!_dev.visible : true;
	                    _item.visible = _visible;
	                };
	                _.forEach(vm.gridOptions.columnDefs, _set_visible);
	                vm.is_refresh = false;
	                vm.gridApi.grid.refresh();
	            }, 0);
	        };

	        vm.resetColumns = function () {
	            delete $localStorage[_restore_name_columns];
	            /*
	                        vm.gridOptions.saveOrder     = false;
	                        vm.gridOptions.saveVisible = false;
	                        vm.gridOptions.saveWidths = false;
	            
	                        
	                        vm.saveState();
	                        vm.restoreState();
	            
	                        vm.gridOptions.saveOrder = true;
	                        vm.gridOptions.saveVisible = true;
	                        vm.gridOptions.saveWidths = true;
	            */
	            vm.refresh();

	            //            vm.gridOptions.columnDefs = vm._columnDefs;
	            //            vm.gridApi.core.refresh();
	        };

	        vm.exportCSV = function () {

	            vm.gridApi.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);

	            $timeout(function () {

	                vm.getPage(vm.gridOptions.paginationCurrentPage, vm.gridOptions.paginationPageSize, false).then(function () {});
	            }, 1000);
	        };

	        vm.getPage = function (_page, _size, _init) {
	            var _cond = vm.get_filters();
	            var _sort = vm.get_sort();

	            var promise = AdminDataService.getOnePageOfAllUsers(_page, _size, _init, _cond, _sort);
	            promise.then(function (data) {
	                vm.gridOptions.totalItems = data.cntrecords;
	                vm.gridOptions.data = _.col13dig2date(data.records);

	                //                var _len = vm.gridOptions.data.length;
	                //                vm.gridOptions.minRowsToShow = _len + 4;
	            });

	            return promise;
	        };

	        //        vm.gridData = [];


	        //        activate();
	        function activate() {
	            vm.excel_url = vm.getabsurl('/spa/userlist.ashx');

	            var _page = 1;

	            LoginService.getuserinfo().then(function (data) {
	                vm.userinfo = data;
	            });

	            if ($localStorage[_restore_name]) {
	                var _ls = $localStorage[_restore_name];
	                vm.filters = angular.merge({}, _ls['filters']);
	                vm.gridOptions.paginationPageSize = _ls['pagesize'];

	                if (vm.filters.subscr_status == 'registrants') {
	                    vm.gridOptions.paginationPageSize = 25;
	                }

	                var _page = _ls['page'];
	                var _username = _ls["username"];
	                var _fullscreen = _ls["isFullScreen"];
	                vm.gridOptions.paginationCurrentPage = _page;

	                if (_fullscreen) {
	                    $timeout(function () {
	                        angular.element('button:contains(Toggle)').click();
	                    }, 1000);
	                }
	                /* aggi
	                                var _sort = _ls["sort"];
	                                var  _rest_sort=function(_col)
	                                { 
	                                    var _save_col=_.find(_sort,{name:_col.name}); 
	                                    if (!_save_col) return;
	                                    angular.merge(_col, { sort: _save_col.sort });
	                                };
	                
	                                _.forEach(vm.gridOptions.columnDefs, _rest_sort);
	                */

	                delete $localStorage[_restore_name];
	            }

	            if ($localStorage[_restore_name_columns]) {
	                var _columns = $localStorage[_restore_name_columns].columns;
	                var _rest_sort = function _rest_sort(_col) {
	                    var _save_col = _.find(_columns, { name: _col.name });
	                    if (!_save_col) return;
	                    angular.merge(_col, { sort: _save_col.sort });
	                };

	                //                _.forEach(vm.gridOptions.columnDefs, _rest_sort);
	                _.forEach(vm.gridApi.grid.columns, _rest_sort);
	            }

	            //            vm.restoreState();

	            vm.getPage(_page, vm.gridOptions.paginationPageSize, true).then(function () {
	                vm.restoreState();
	                _afterregisterApi(vm.gridApi);

	                if (!_username) return;

	                vm.show_detail = false;
	                vm.crnt_row = {};

	                var _row = _.find(vm.gridOptions.data, { UserName: _username });
	                if (_row) {
	                    vm.crnt_row = _row;
	                    vm.show_detail = true;
	                }
	            });
	        }
	    }
	    _AllUsersController.$inject = ["$scope", "$q", "$timeout", "$localStorage", "$state", "$location", "$http", "_", "FFD_CONST", "toaster", "uiGridConstants", "uiGridExporterConstants", "uiGridPaginationService", "LoginService", "AdminDataService", "ToolsService"];

	    return _AllUsersController;
	};

/***/ },

/***/ 122:
/***/ function(module, exports) {

	module.exports = "<div class=\"text-xs-center\" ng-if=\"COL_FIELD\">\r\n    <i class=\"fa fa-check\" ></i>\r\n</div>";

/***/ },

/***/ 123:
/***/ function(module, exports) {

	module.exports = "<div class=\"grid-action-cell  text-xs-center\">\r\n    <button class=\"btn btn-sm\"\r\n            style=\"padding: 0.3em; height:1.5em; line-height: 0;\"\r\n            ng-click=\"grid.appScope.detail($event,row.entity)\">\r\n        <span>\r\n            ...\r\n        </span>\r\n    </button>\r\n</div>\r\n";

/***/ },

/***/ 127:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {
	    /* @ngInject */
	    function _Faq_Controller($scope, $timeout, $uiViewScroll, $stateParams, ToolsService) {
	        var vm = this;
	        //        vm.sampleurl = require('../../../samples/sample.xlsx');

	        vm.download_sample = function (_event) {
	            _event.preventDefault();
	            ToolsService.DownloadSample();
	        };

	        var _sto = $stateParams.scrollto;
	        var _exp = null;

	        //        if (_sto == "#faq-privacy")  _exp="$('div[title*=privacy] a').click()";
	        if (_sto == "#faq-privacy") _exp = "angular.element('div[title*=privacy] a').click()";

	        if (_sto) {

	            $timeout(function () {
	                //                $uiViewScroll($(_sto))
	                $uiViewScroll(angular.element(_sto)).then(function () {
	                    if (_sto) eval(_exp);
	                });
	            }, 1000);
	        }
	    }
	    _Faq_Controller.$inject = ["$scope", "$timeout", "$uiViewScroll", "$stateParams", "ToolsService"];;

	    return _Faq_Controller;
	};

/***/ },

/***/ 138:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {
	    /* @ngInject */
	    function _TryIt_Controller($scope, $timeout, $uiViewScroll, $stateParams, ToolsService) {
	        var vm = this;

	        var _sto = $stateParams.scrollto;
	        var _exp = null;
	        if (_sto) {

	            $timeout(function () {
	                $uiViewScroll(angular.element(_sto));
	            }, 1000);
	        }
	    }
	    _TryIt_Controller.$inject = ["$scope", "$timeout", "$uiViewScroll", "$stateParams", "ToolsService"];;

	    return _TryIt_Controller;
	};

/***/ },

/***/ 141:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function ContactController($scope, $state, $http, FFD_CONST) {

	        $scope.sended = false;
	        $scope.sendmessage = function ($event) {
	            //            alert(angular.toJson(vm.rental));
	            $event.preventDefault();

	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "sendFeedBack",
	                data: { _obj: vm.rental }
	            });

	            request.success(function (data, status, headers, config) {}).error(function (data, status, headers, config) {});

	            //            $state.go('thankyou');
	            $state.go('home');
	        };

	        var vm = this;
	        $scope.inqtypes = [{ id: 1, name: "contact us" }, { id: 2, name: "build a list" }];

	        // The model object that we reference
	        // on the  element in index.html
	        vm.rental = { inquiry_type: $scope.inqtypes[0].name };

	        // An array of our form fields with configuration
	        // and options set. We make reference to this in
	        // the 'fields' attribute on the  element
	        vm.rentalFields = [{
	            key: 'first_name',
	            //                type: "horizontalInput",
	            type: "bs4Input",
	            //                validators: { notbob: "$viewValue!=='bob'" },
	            templateOptions: {
	                type: 'text',
	                //                    label: 'First Name',
	                placeholder: 'First Name',
	                required: true,
	                //                    minlength: 5,
	                maxlength: 25,

	                validation: {
	                    messages: [{
	                        name: 'required',
	                        message: "Sorry, that wasn''t the correct email address."
	                    }]
	                }

	            }

	        }, {
	            key: 'last_name',
	            //                type: "horizontalInput",
	            type: "bs4Input",
	            templateOptions: {
	                type: 'text',
	                //                    label: 'Last Name',
	                placeholder: 'Last Name',
	                //                    minlength: 5,
	                maxlength: 25,
	                required: true
	            }
	        }, {
	            key: 'company',
	            //                type: "horizontalInput",
	            type: "bs4Input",
	            templateOptions: {
	                type: 'text',
	                //                    label: 'Company',
	                placeholder: 'Company Name',
	                //                    minlength: 5,
	                maxlength: 40,
	                required: false
	            }
	        }, {
	            key: 'email',
	            //                type: "horizontalInput",
	            type: "bs4Input",
	            templateOptions: {
	                type: 'email',
	                //                    label: 'Email address',
	                placeholder: 'Email',
	                //                    minlength: 10,
	                maxlength: 80,
	                required: true
	            }
	        }, {
	            key: 'phone',
	            //                type: "horizontalInput",
	            type: "bs4Input",
	            templateOptions: {
	                type: 'text',
	                //                    label: 'Phone',
	                placeholder: 'Phone',
	                //                    minlength: 5,
	                maxlength: 15,
	                required: true
	            }
	        },
	        /*            {
	            key: 'inquiry_type',
	            type: 'horizontalSelect',
	            templateOptions: {
	                label: 'Inquiry Type',
	                labelProp: 'name',
	                valueProp: 'name',
	                options: $scope.inqtypes
	            }
	        },
	        */

	        {
	            key: 'message',
	            //                type: 'horizontalTextArea',
	            type: 'bs4TextArea',
	            templateOptions: {
	                //                        label: 'Message',
	                rows: 5,
	                placeholder: 'Your message',
	                minlength: 25,
	                maxlength: 250,
	                required: true
	            }
	        }

	        /*
	        
	                    {
	                        key: 'captcha',
	                        type: "horizontalCaptcha"
	        
	        
	                   , validators:
	                {
	                    //            bob: '$viewValue=="bob"',
	        
	                    xxx: {
	                        expression: function (vVal, mVal, scope) { return scope.check(vVal); },
	                        message: "xxxxxxxxxxx"
	                    }
	        
	                }
	                
	        
	                        , templateOptions: {
	                            label: 'Captcha',
	                            placeholder: 'Enter 4-digit number'
	                        }
	                    }
	                    */

	        ];
	    }
	    ContactController.$inject = ["$scope", "$state", "$http", "FFD_CONST"];

	    return ContactController;
	};

/***/ },

/***/ 154:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function _controller(InfoFactory, ChoicesFactory) {
	        var vm = this;
	        vm.bustypes = InfoFactory.bustypes;
	        vm.choices = ChoicesFactory.choices;
	        vm.type_id = ChoicesFactory.choices.bustype.id;
	    }
	    _controller.$inject = ["InfoFactory", "ChoicesFactory"];

	    return _controller;
	};

/***/ },

/***/ 165:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {
	    /* @ngInject */

	    function _YourDataProController($scope, toaster) {
	        var vm = this;

	        vm.cal_expert = function () {
	            if (!window.Tawk_API) {
	                toaster.pop('info', 'Tawk API not loade!');
	                return false;
	            }
	            Tawk_API.toggle();
	            return false;
	        };
	    }
	    _YourDataProController.$inject = ["$scope", "toaster"];

	    return _YourDataProController;
	};

/***/ },

/***/ 170:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function _SearchController(FFD_CONST, InfoFactory, ChoicesFactory, $scope, $localStorage, $timeout, toaster, GetResultsFactory) {

	        var _frst = true;

	        var vm = this;

	        //        vm.selcolors = ['red'];
	        //        vm.colors = ['red', 'blue', 'green'];

	        vm.choices = ChoicesFactory.choices;

	        vm.bustypes = InfoFactory.bustypes;
	        vm.companysizes = InfoFactory.companysizes;
	        vm.salesvolumes = InfoFactory.salesvolumes;
	        vm.cities = [];
	        vm.counties = [];
	        vm.keywords = [];
	        vm.states = [];
	        vm.siccodes = [];
	        vm.zipcodes = [];
	        vm.areacodes = [];

	        vm.set2start = function () {
	            /*
	            var _dend = moment().format("MM/DD/YYYY");
	            var _dstart = moment().subtract(6, "months").format("MM/DD/YYYY");
	              ChoicesFactory.choices =
	            {
	            bustype: vm.choices.bustype,
	            date_start: _dstart,
	            date_start_: moment().subtract(6, "months").toDate(),
	            date_end: _dend,
	            date_end_: moment().toDate(),
	            states: [],
	            cities: [],
	            zipcodes: [],
	            areacodes: [],
	            counties: [],
	            siccodes: [],
	            keywords: [],
	            rbdiBusiness: false,
	            rbdiIndividual: false,
	            rbdiUnknown: false,
	            zipForRadius: "",
	            radiusMiles: "",
	            companysizes: [],
	            salesvolumes: [],
	            chkContactNames: false,
	            chkPhoneNumbers: false
	            };
	            */

	            $timeout(function () {
	                ChoicesFactory.clear_choices();
	                vm.choices = ChoicesFactory.choices;
	            });
	        };

	        vm.results = { _count: 0, _leftcount: 0, _demo: false, isLoaded: false };

	        vm.refresh_counters = function () {

	            GetResultsFactory.getCounters().then(function (data) {

	                vm.results = {
	                    _count: data.count,
	                    _leftcount: data.leftcount,
	                    _demo: JSON.parse(data.demo.toLowerCase()),
	                    isLoaded: true
	                };
	            });
	        };

	        vm.getcities = function (phrase) {
	            vm.cities = [];
	            InfoFactory.getcities(phrase, vm.choices.states).then(function (_cities) {
	                vm.cities = _cities.cities;
	            });
	        };

	        vm.getcounties = function (phrase) {
	            vm.counties = [];
	            InfoFactory.getcounties(phrase, vm.choices.states).then(function (_counties) {
	                vm.counties = _counties.counties;
	            });
	        };

	        vm.getkeywords = function (phrase) {
	            vm.keywords = [];
	            InfoFactory.getsic2kw(phrase).then(function (_kw) {
	                vm.keywords = _kw.keywords;
	            });
	        };

	        InfoFactory.getallstates().then(function (_states) {
	            vm.states = _states.states;
	        });

	        InfoFactory.getsiccodes().then(function (_siccodes) {
	            vm.siccodes = _siccodes.siccodes;
	        });

	        vm.checkMiles = function () {
	            var _correct = true;
	            var _tmp = vm.choices.radiusMiles;
	            var _tmp_1 = parseInt("0" + _tmp).toString();
	            var _tmp_2 = parseInt(_tmp_1);

	            if (_tmp.length > 0 && _tmp.length != _tmp_1.length) {
	                _correct = false;
	            }

	            if (!_correct && _tmp_2 > 999) {
	                _correct = false;
	            }

	            if (!_correct) {
	                $timeout(function () {
	                    vm.choices.radiusMiles = "";
	                    toaster.pop('error', "Miles must be in range 0-999 ... ");
	                }, 0);
	            }
	        };

	        vm.checkZipRadius = function () {
	            var _correct = true;

	            var _tmp = vm.choices.zipForRadius.trim();
	            if (_tmp.length > 0 && !/^\d{5}$/.test(_tmp)) {
	                _correct = false;
	            }

	            if (!_correct) {
	                $timeout(function () {
	                    vm.choices.zipForRadius = "";
	                    toaster.pop('error', "ZIP code must have 5-digit value ... ");
	                }, 0);
	            }
	        };

	        activate();

	        function activate() {
	            $scope.$watch("vm.choices.states", function (new_, old_) {
	                if (!_frst) {
	                    $timeout(function () {
	                        vm.choices.cities = [];
	                        vm.choices.counties = [];
	                    }, 0);
	                }
	                _frst = false;
	            });

	            vm.getdraftzip = function (_val) {
	                if (_val != '') {
	                    vm._lastzip = _val;
	                };
	                var _rez = !/^\d{5}(-\d{5})?$/.test(vm._lastzip);
	                if (!_rez && _val == '') {
	                    vm.choices.zipcodes.push(vm._lastzip);vm.choices.zipcodes = _.uniq(vm.choices.zipcodes);
	                }
	            };

	            //            $scope.$watch("vm.choices.bustype", function (new_, old_) { vm.set2start(); });

	            $scope.$watch("vm.choices.zipcodes", function (new_, old_) {
	                $timeout(function () {
	                    _.remove(vm.choices.zipcodes, function (itm) {
	                        var _rez = !/^\d{5}(-\d{5})?$/.test(itm);

	                        if (!_rez) {
	                            var _arr = itm.split('-');
	                            if (_arr.length == 2) {
	                                var _istart = parseInt(_arr[0]);
	                                var _iend = parseInt(_arr[1]);
	                                _rez = _istart > _iend;
	                            }
	                        }

	                        if (_rez) {
	                            toaster.pop('error', "Incorrect ZIP range " + itm, "Enter ZIP (12345) or ZIP range(12345-12345) ...");
	                        }

	                        return _rez;
	                    });
	                }, 0);
	            });

	            $scope.$watch("vm.choices.areacodes", function (new_, old_) {
	                $timeout(function () {
	                    _.remove(vm.choices.areacodes, function (itm) {
	                        var _rez = !/^\d{3}(-\d{3})?$/.test(itm);

	                        if (!_rez) {
	                            var _arr = itm.split('-');
	                            if (_arr.length == 2) {
	                                var _istart = parseInt(_arr[0]);
	                                var _iend = parseInt(_arr[1]);
	                                _rez = _istart > _iend;
	                            }
	                        }

	                        if (_rez) {
	                            toaster.pop('error', "Incorrect area range " + itm, "Enter area (123) or area range(123-123) ...");
	                        }

	                        return _rez;
	                    });
	                }, 0);
	            });
	        }
	    }
	    _SearchController.$inject = ["FFD_CONST", "InfoFactory", "ChoicesFactory", "$scope", "$localStorage", "$timeout", "toaster", "GetResultsFactory"];;

	    return _SearchController;
	};

/***/ },

/***/ 189:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function ResetPasswordController($scope, $state, toaster, LoginService) {

	        $scope.resetpassword = function ($event) {
	            $event.preventDefault();

	            //            LoginService.changepassword(vm.data.old_password, vm.data.new_password)
	            LoginService.resetpassword(vm.data.email).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    var _message = 'New password has been sent to ' + vm.data.email;
	                    toaster.pop('success', _message);
	                    $state.go('home');
	                }
	            });
	        };

	        var vm = this;
	        vm.data = {};

	        vm.dataFields = [{
	            key: 'email',
	            type: 'bs4Input', // "horizontalInput",
	            templateOptions: {
	                type: 'email',
	                label: 'Email address',
	                placeholder: 'Enter email',
	                required: true,
	                //                    minlength: 10,
	                maxlength: 40

	            }
	        }];
	    }
	    ResetPasswordController.$inject = ["$scope", "$state", "toaster", "LoginService"];

	    return ResetPasswordController;
	};

/***/ },

/***/ 192:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function toUpperCase(value) {
	        return (value || '').toUpperCase();
	    }
	    toUpperCase.$inject = ["value"];

	    function toLowerCase(value) {
	        return (value || '').toLowerCase();
	    }

	    function RegisterController($scope, $timeout, $state, $http, $filter, $sessionStorage, LoginService, toaster) {

	        var vm = this;

	        vm.breakpoint = {};

	        $scope.$watch('vm.breakpoint.xs || vm.breakpoint.sm', function () {
	            vm.regdata.mobile = vm.breakpoint.xs || vm.breakpoint.sm;
	        });

	        vm.adduser = function ($event) {
	            //            vm.options.updateInitialValue();

	            $event.preventDefault();

	            //            localStorageService.set('_regdata', angular.toJson(vm.regdata));
	            $sessionStorage["_regdata"] = vm.regdata;

	            LoginService.createuser(vm.regdata).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    $state.go('registersuccess');
	                }
	            });
	        };

	        //        var vm = this;

	        vm.countries = [{ id: 1, name: "United States" }, { id: 2, name: "Canada" }];

	        vm.businesSes = [{ name: "How large is your business?", value: "" }, { name: "MICRO BUSINESS", value: "MICRO BUSINESS" }, { name: "HOME BASE BUSINESS", value: "HOME BASE BUSINESS" }, { name: "SMALL BUSINESS", value: "SMALL BUSINESS" }, { name: "LARGE BUSINESS", value: "LARGE BUSINESS" }];

	        vm.regdata = {
	            CompanyName: '',
	            Title: null,
	            Address: '',
	            City: '',
	            State: '',
	            Zip: '',
	            Country: '',
	            PhoneNumber: '',
	            HearOfUs: '',
	            BusinessType: '',
	            Message: null

	        };

	        vm.options = { removeChromeAutoComplete: true };
	        var internalState = {
	            FirstName: ''
	        };

	        //        var _stmp = localStorageService.get('_regdata');
	        //        if (_stmp != null) vm.regdata = angular.fromJson(_stmp);


	        var _stmp = $sessionStorage['_regdata'];
	        if (_stmp != null) vm.regdata = _stmp;

	        function toUpperCase(value) {
	            return (value || '').toUpperCase();
	        }

	        vm.regdataFields = [{
	            key: 'FirstName',
	            type: "bs4-horizontalInput",

	            /*
	            modelOptions: { getterSetter: true },
	            value: function (val) {
	                if (angular.isDefined(val))
	                {
	                    vm.regdata.FirstName = $filter('capitalize')((val || ''));
	                }
	                return $filter('capitalize')(vm.regdata.FirstName||'');
	            },
	            */

	            //                extras:{ validateOnModelChange: true},
	            templateOptions: {
	                type: 'text',
	                label: 'First Name',
	                placeholder: 'Enter First Name',
	                //                    minlength: 5,
	                maxlength: 25,
	                required: true
	            },

	            watcher: {
	                listener: function listener(field, newValue, oldValue, scope, stopWatching) {
	                    if (newValue) {
	                        vm.regdata.FirstName = $filter('capitalize')(newValue || '');
	                        console.log('Default Expression: ' + newValue);
	                    }
	                }
	            }

	            //                ,parsers: [toUpperCase]
	            //                ,formatters: [toUpperCase]
	        }, {
	            key: 'LastName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Last Name',
	                placeholder: 'Enter Last Name',
	                //                    minlength: 5,
	                maxlength: 25,
	                required: true
	            },
	            watcher: {
	                listener: function listener(field, newValue, oldValue, scope, stopWatching) {
	                    if (newValue) {
	                        vm.regdata.LastName = $filter('capitalize')(newValue || '');
	                    }
	                }
	            }

	        }, {
	            key: 'Email',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'email',
	                label: 'Email address',
	                placeholder: 'Enter email',
	                required: true,
	                //                    minlength: 10,
	                maxlength: 80

	            }
	        }, {
	            key: 'confirmEmail',
	            type: 'bs4-horizontalInput',
	            optionsTypes: ['matchField'],
	            model: vm.confirmationModel,
	            templateOptions: {
	                type: 'email',
	                label: 'Confirm email address',
	                placeholder: 'Please re-enter your e-mail',
	                required: true,
	                //                minlength: 6,
	                maxlength: 80
	            },
	            data: {
	                fieldToMatch: 'Email',
	                modelToMatch: vm.model
	            }

	        }, {

	            key: 'UserName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'User Name',
	                placeholder: 'Enter your User name',
	                //                        minlength: 5,
	                maxlength: 25,
	                required: true
	            }

	            //        ,parsers: [toLowerCase]
	            //        ,formatters: [toUpperCase]

	        }, {
	            key: 'Password',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'password',
	                label: 'Password',
	                placeholder: 'Enter password',
	                required: true,
	                minlength: 6,
	                maxlength: 20
	            }
	        }, {
	            key: 'confirmPassword',
	            type: 'bs4-horizontalInput',
	            optionsTypes: ['matchField'],
	            model: vm.confirmationModel,
	            templateOptions: {
	                type: 'password',
	                label: 'Confirm Password',
	                placeholder: 'Please re-enter your password',
	                required: true,
	                minlength: 6,
	                maxlength: 20

	            },
	            data: {
	                fieldToMatch: 'Password',
	                modelToMatch: vm.model
	            }
	        }, {
	            key: 'Zip',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Zip',
	                placeholder: 'Enter Zip',
	                required: true
	            }
	        }, {
	            key: 'CompanyName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Company Name',
	                placeholder: 'Enter Company name',
	                required: true
	            },
	            hideExpression: 'model.mobile'
	        }

	        /*
	            {
	                    key: 'Title',
	                    type: "horizontalInput",
	                    templateOptions: {
	                        type: 'text',
	                        label: 'Title',
	                        placeholder: 'Enter Title',
	                        required: true
	                    }
	                },
	                */

	        /*
	        {
	            key: 'Address',
	            type: "horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Address',
	                placeholder: 'Enter Address',
	                required: true
	            }
	        },
	              {
	            key: 'City',
	            type: "horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'City',
	                placeholder: 'Enter City',
	                required: true
	            }
	        },
	              {
	            key: 'State',
	            type: "horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'State/Province/Region',
	                placeholder: 'Enter State/Province/Region',
	                required: true
	            }
	        },
	            {
	            key: 'Zip',
	            type: "horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Zip',
	                placeholder: 'Enter Zip',
	                required: true
	            }
	        },
	          {
	            key: 'Country',
	            type: 'horizontalSelect',
	            templateOptions: {
	                label: 'Country',
	                labelProp: 'name',
	                valueProp: 'name',
	                options: $scope.countries,
	                required: true
	            }
	        },
	          {
	            key: 'PhoneNumber',
	            type: "horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Phone number',
	                placeholder: 'Enter your phone',
	                required: true
	            }
	        },
	         {
	           key: 'HearOfUs',
	           type: 'horizontalTextArea',
	           templateOptions:
	               {
	                   label: 'How did you hear of us?',
	                   rows: 5,
	                   placeholder: 'How did you hear of us?',
	                   required: true
	               }
	        },
	          ,{
	            key: 'BusinessType',
	            type: 'bs4-horizontalSelect',
	            defaultValue: "",
	            templateOptions: {
	                label: 'How large is your business?',
	                labelProp: 'name',
	                valueProp: 'value',
	                options: vm.businesSes
	            },
	            hideExpression: 'model.mobile'
	        }
	        */

	        , {
	            key: 'BusinessType',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Business Type',
	                placeholder: 'Enter Business type'
	            },
	            hideExpression: 'model.mobile'
	        }

	        /*
	        
	                   {
	                       key: 'captcha',
	                       type: "horizontalCaptcha"
	        
	        
	                   , validators:
	                {
	                    xxx: {
	                        expression: function (vVal, mVal, scope) { return scope.check(vVal); },
	                        message: "xxxxxxxxxxx"
	                    }
	        
	                }
	        
	        
	                        , templateOptions: {
	                            label: 'Captcha',
	                            placeholder: 'Enter 4-digit number'
	                        }
	                   }
	        
	                   */

	        ];
	    }

	    return RegisterController;
	};

/***/ },

/***/ 195:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function ConfirmRegisterController($scope, $state, $stateParams, LoginService, InfoFactory, ChoicesFactory, toaster, $sessionStorage) {
	        var vm = this;

	        vm._res = 'LOAD';

	        LoginService.ConfirmRegistration($stateParams.memberID).then(function (data) {
	            vm._res = data.result;

	            if (data.result && data.result == "ERROR" && data.message) {
	                vm._res = 'ERROR';
	                toaster.pop('error', data.message);
	                return;
	            }

	            if (data.result && data.result == "OK" && data.state) {
	                if (data.udata) {
	                    try {
	                        var _srchdata = angular.fromJson(decodeURIComponent(data.udata));

	                        /*
	                        if (_srchdata.choices != undefined) {
	                            $sessionStorage['searchform'] = _srchdata;
	                        }
	                        */

	                        if (_srchdata.bustype != undefined) {
	                            vm._res = 'OK';

	                            delete _srchdata.date_start;
	                            delete _srchdata.date_start_;
	                            delete _srchdata.date_end;
	                            delete _srchdata.date_end_;

	                            angular.merge(ChoicesFactory.choices, _srchdata);

	                            ChoicesFactory.choices.bustype = InfoFactory.bustypes[_srchdata.bustype.id == 1 ? 0 : 1];
	                        }
	                    } catch (e) {
	                        console.log('Error ' + e.name + ":" + e.message + "\n" + e.stack);
	                    }
	                }

	                //         $state.go(data.state);
	                $state.go('search');
	                return;
	            }
	        });
	    }
	    ConfirmRegisterController.$inject = ["$scope", "$state", "$stateParams", "LoginService", "InfoFactory", "ChoicesFactory", "toaster", "$sessionStorage"];

	    return ConfirmRegisterController;
	};

/***/ },

/***/ 200:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    //    app.controller('ChangePasswordController', ChangePasswordController);

	    //    ChangePasswordController.$inject = ['$scope', '$state', 'toaster', 'LoginService'];

	    function ChangePasswordController($scope, $state, toaster, LoginService) {

	        var vm = this;
	        vm.data = {};

	        vm.changepassword = function ($event) {
	            $event.preventDefault();
	            LoginService.changepassword(vm.data.old_password, vm.data.new_password).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    $state.go('profile.changepasswordsuccess');
	                }
	            });
	        };

	        vm.dataFields = [{
	            key: 'old_password',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'password',
	                label: 'Old Password',
	                placeholder: 'Enter old password',
	                required: true,
	                minlength: 6,
	                maxlength: 20
	            }
	        }, {
	            key: 'new_password',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'password',
	                label: 'New Password',
	                placeholder: 'Enter new password',
	                required: true,
	                minlength: 6,
	                maxlength: 20
	            }
	        }, {
	            key: 'confirmPassword',
	            type: 'bs4-horizontalInput',
	            optionsTypes: ['matchField'],
	            model: vm.confirmationModel,
	            templateOptions: {
	                type: 'password',
	                label: 'Confirm New Password',
	                placeholder: 'Please re-enter new password',
	                required: true,
	                minlength: 6,
	                maxlength: 20

	            },
	            data: {
	                fieldToMatch: 'new_password',
	                modelToMatch: vm.data
	            }
	        }];
	    }
	    ChangePasswordController.$inject = ["$scope", "$state", "toaster", "LoginService"];

	    return ChangePasswordController;
	};

/***/ },

/***/ 204:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function ChangePersonalDataController($scope, $state, $stateParams, $http, $sessionStorage, LoginService, toaster) {

	        var vm = this;

	        vm._backto = $stateParams.backto;
	        vm._username = $stateParams.username;

	        vm.countries = [{ id: 1, name: "United States" }, { id: 2, name: "Canada" }];

	        vm.businesSes = [{ name: "MICRO BUSINESS" }, { name: "HOME BASE BUSINESS" }, { name: "SMALL BUSINESS" }, { name: "LARGE BUSINESS" }];

	        vm.data = {
	            CompanyName: '',
	            Title: null,
	            Address: '',
	            City: '',
	            State: '',
	            Zip: '',
	            Country: '',
	            PhoneNumber: '',
	            HearOfUs: '',
	            BusinessType: null,
	            Message: null

	        };

	        //        var _stmp = localStorageService.get('_regdata');
	        //        if (_stmp != null) vm.regdata = angular.fromJson(_stmp);


	        //        var _stmp = $sessionStorage['_updatepersdata'];
	        //        if (_stmp != null) vm.data = _stmp;


	        vm.dataFields = [{
	            key: 'Email',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'email',
	                label: 'Email address',
	                placeholder: 'Enter email',
	                required: true,
	                //                    minlength: 10,
	                maxlength: 30

	            }
	        }, {
	            key: 'FirstName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'First Name',
	                placeholder: 'Enter First Name',
	                //                    minlength: 5,
	                maxlength: 25,
	                required: true
	            }
	        }, {
	            key: 'LastName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Last Name',
	                placeholder: 'Enter Last Name',
	                //                    minlength: 5,
	                maxlength: 25,
	                required: true
	            }
	        }, {
	            key: 'Zip',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Zip',
	                placeholder: 'Enter Zip',
	                required: true
	            }
	        }

	        /*
	        ,{
	           key: 'captcha',
	           type: "bs4-horizontalCaptcha"
	           , validators:
	        {
	        //            bob: '$viewValue=="bob"',
	          xxx: {
	            expression: function (vVal, mVal, scope) { return scope.check(vVal); },
	            message: "xxxxxxxxxxx"
	        }
	        }
	                , templateOptions: {
	                label: 'Captcha',
	                placeholder: 'Enter 4-digit number'
	            }
	        }
	        */

	        ];

	        vm.cancel = function ($event) {
	            $event.preventDefault();
	            $state.go(vm._backto ? vm._backto : 'profile');
	        };

	        vm.updatedata = function ($event) {
	            $event.preventDefault();

	            //            localStorageService.set('_regdata', angular.toJson(vm.regdata));
	            //            $sessionStorage["_updatepersdata"]=vm.data;

	            LoginService.updateuserinfo(vm.data, vm._username).then(function (data) {
	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {
	                    $state.go(vm._backto ? vm._backto : 'profile');
	                }
	            });
	        };

	        LoginService.getuserinfo().then(function (data) {
	            if (data.islogged) {
	                LoginService.getuserdetailinfo(vm._username).then(function (data) {
	                    if (data.result == 'ERROR') {
	                        toaster.pop('error', data.message);
	                    }
	                    if (data.result == 'OK') {
	                        var _xx = angular.merge(vm.data, data.data);
	                    }
	                });
	            }
	        });
	    }
	    ChangePersonalDataController.$inject = ["$scope", "$state", "$stateParams", "$http", "$sessionStorage", "LoginService", "toaster"];

	    return ChangePersonalDataController;
	};

/***/ },

/***/ 216:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function UnsubscribeController($scope, LoginService, toaster) {
	        var vm = this;
	        vm.done = false;

	        vm.unsubscribe = function ($event) {
	            //            $event.preventDefault();
	            //            alert('UNSUBSCRIBE');
	            LoginService.unsubscribe("").then(function (data) {
	                if (data.result == "OK") {
	                    vm.done = true;
	                }
	                if (data.result == "ERROR") {
	                    toaster.pop('error', data.message);
	                }
	            });
	        };
	    }
	    UnsubscribeController.$inject = ["$scope", "LoginService", "toaster"];

	    return UnsubscribeController;
	};

/***/ },

/***/ 219:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function ChangeCreditCardDataController($scope, $timeout, $state, $http, $q, _, $sessionStorage, toaster, LoginService, FFD_CONST) {
	        var vm = this;

	        vm.is_success = false;
	        vm.in_process = false;

	        $scope.changeCCdata = function ($event) {
	            $event.preventDefault();
	            //            $sessionStorage["_subscriptiondata"] = vm.regdata;

	            vm.in_process = true;

	            LoginService.changecreditcarddata(vm.data).then(function (data) {
	                //                 $state.go('showcounters');
	                vm.in_process = false;

	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }

	                if (data.result == 'OK') {
	                    vm.is_success = true;
	                    return;
	                    $state.go('search');
	                }
	            });
	        };

	        vm.initform = InitForm;

	        vm.countries = [];

	        vm.options = { removeChromeAutoComplete: true };

	        vm.initform().then(function (data) {});

	        $scope._months = [{ name: "January", value: "01" }, { name: "February", value: "02" }, { name: "March", value: "03" }, { name: "April", value: "04" }, { name: "May", value: "05" }, { name: "June", value: "06" }, { name: "July", value: "07" }, { name: "August", value: "08" }, { name: "September", value: "09" }, { name: "October", value: "10" }, { name: "November", value: "11" }, { name: "December", value: "12" }];

	        $scope._years = [];

	        var _currYear = new Date().getFullYear();

	        for (var i = _currYear; i < _currYear + 10; i++) {
	            $scope._years.push({ value: i });
	        }

	        vm.data = {};

	        vm.dataFields = [{
	            key: 'CreditCard',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Credit Card Number',
	                placeholder: 'Enter your credit card number',
	                required: true,
	                disabled: true,
	                minlength: 14,
	                maxlength: 16

	            }
	        }, {
	            key: 'CardYear',
	            type: 'bs4-horizontalSelect',
	            templateOptions: {
	                label: 'End date year',
	                labelProp: 'value',
	                valueProp: 'value',
	                options: $scope._years,
	                required: true
	            }
	        }, {
	            key: 'CardMonth',
	            type: 'bs4-horizontalSelect',
	            templateOptions: {
	                label: 'End date month',
	                labelProp: 'name',
	                valueProp: 'value',
	                options: $scope._months,
	                required: true
	            }
	        }, {
	            key: 'CVV',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'password',
	                label: 'Verification Code',
	                placeholder: 'Enter verification code',
	                required: true,
	                minlength: 3,
	                maxlength: 4,
	                disabled: true
	            }
	        }, {
	            key: 'CompanyName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Company Name',
	                placeholder: 'Enter Company name',
	                //                    minlength: 5,
	                maxlength: 40

	            }
	        }, {
	            key: 'FirstName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'First Name',
	                placeholder: 'Enter First Name',
	                //                    minlength: 5,
	                maxlength: 25,
	                required: true
	            }
	        }, {
	            key: 'LastName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Last Name',
	                placeholder: 'Enter Last Name',
	                //                    minlength: 5,
	                maxlength: 25,
	                required: true
	            }
	        }, {
	            key: 'Address',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Address',
	                placeholder: 'Enter Address',
	                //                    minlength: 5,
	                maxlength: 40,
	                required: true
	            }
	        }, {
	            key: 'City',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'City',
	                placeholder: 'Enter City',
	                required: true,
	                //                    minlength: 5,
	                maxlength: 40

	            }
	        }, {
	            key: 'State',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'State/Province/Region',
	                placeholder: 'Enter State/Province/Region',
	                minlength: 2,
	                maxlength: 25,
	                required: true
	            }
	        }, {
	            key: 'Zip',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Zip',
	                placeholder: 'Enter Zip',
	                minlength: 5,
	                maxlength: 12,
	                required: true
	            }
	        }, {
	            key: 'Country',
	            type: 'bs4-horizontalSelect',
	            templateOptions: {
	                label: 'Country',
	                labelProp: 'name',
	                valueProp: 'name',
	                options: [{ name: 'United States' }, { name: 'Canada' }, { name: 'United Kingdom' }], //vm.countries,
	                required: true

	            },
	            controller: ['$scope', function ($scope) {
	                vm.initform().then(function (data) {
	                    $scope.options.templateOptions.options = _.map(data._countries, function (item) {
	                        return { name: item };
	                    });

	                    vm.data.FirstName = data._edFirstName;
	                    vm.data.LastName = data._edLastName;

	                    vm.data.Address = data._edAddress;
	                    vm.data.City = data._edCity;
	                    vm.data.Zip = data._edZip;
	                    vm.data.State = data._edState;
	                    vm.data.Country = data._edCountry;
	                    vm.data.CompanyName = data._edCompanyName;

	                    //                                var _stmp = $sessionStorage['_subscriptiondata'];
	                    //                                if (_stmp != null) vm.regdata = _stmp;

	                    //                                $scope.$apply();
	                });
	            }]

	        }];

	        $timeout(function () {
	            angular.element('input[disabled]').each(function () {
	                angular.element(this).removeAttr('disabled');
	            });
	        }, 3000);

	        function InitForm() {
	            var deferrer = $q.defer();
	            var self = this;

	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "getStartInfoForSubscription",
	                data: {}
	            });

	            request.success(function (data, status, headers, config) {
	                deferrer.resolve(data.d);
	            }).error(function (data, status, headers, config) {
	                deferrer.reject("Error !!!");
	            });
	            return deferrer.promise;
	        }
	    }
	    ChangeCreditCardDataController.$inject = ["$scope", "$timeout", "$state", "$http", "$q", "_", "$sessionStorage", "toaster", "LoginService", "FFD_CONST"];

	    return ChangeCreditCardDataController;
	};

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (app) {
	        /* @ngInject */

	        function QueryHistoryController($scope, $state, $stateParams, $timeout, uiGridConstants, uiGridPaginationService, InfoFactory, ChoicesFactory, QueryHistoryService, _, toaster, LoginService) {
	                var vm = this;
	                vm._backto = $stateParams.backto ? $stateParams.backto : "profile";
	                vm._username = $stateParams.username;

	                vm.grid_height = 100;

	                //$scope.gridScope = $scope;

	                vm.rerun_ = function ($event, ent) {

	                        $event.preventDefault();
	                        $event.stopPropagation();
	                        $scope.value = ent.ListId;

	                        console.log('query>>>', ent);
	                        return;

	                        LoginService.getuserinfo().then(function (data) {
	                                if (data.islogged) {
	                                        QueryHistoryService.getQueryInfo(ent.ListId).then(function (data) {
	                                                if (data.result == "OK") {
	                                                        $scope.orderinfo = data.data;
	                                                }
	                                                if (data.result != "OK" && data.message) {
	                                                        toaster.pop('error', data.message);
	                                                }
	                                        });
	                                }
	                        });
	                };

	                vm.rerun = function ($event, _row) {
	                        $event.preventDefault();
	                        console.log(_row);

	                        QueryHistoryService.getUserQuery(_row.QueryID).then(function (_data) {
	                                console.log(_data);

	                                var _bustype = { id: _data.selectedlist, name: _data.selectedlist == 1 ? "NEW BUSINESS" : "ESTIMATED BUSINESS" };

	                                //                var _date_start = eval(_data.date_start.replace('/', '').replace('/', ''));
	                                //                var _date_end = eval(_data.date_end.replace('/', '').replace('/', ''));

	                                //                var _date_start = eval("new " + (_data.date_start.replace('/', '').replace('/', '')));
	                                //                var _date_end = eval("new " + (_data.date_end.replace('/', '').replace('/', '')));


	                                _data.selectedlist = 1;

	                                ChoicesFactory.clear_choices();

	                                var _choices = ChoicesFactory.choices; //{};
	                                _choices.bustype = InfoFactory.bustypes[_data.selectedlist == 1 ? 0 : 1]; //         _bustype;
	                                _choices.cities = _data.Cities;
	                                _choices.states = _data.States;
	                                _choices.counties = _data.Counties;
	                                _choices.zipcodes = _data.ZipCodes;
	                                _choices.zipForRadius = _data.ZipForRadius;
	                                _choices.radiusMiles = _data.Miles;
	                                _choices.areacodes = _data.AreaCodes;
	                                _choices.siccodes = _data.GroupSICCodes;

	                                _choices.companysizes = _data.Employees;
	                                _choices.salesvolumes = _data.Sales;

	                                _choices.chkContactNames = _data.WithContacts;
	                                _choices.chkPhoneNumbers = _data.WithPhones;
	                                _choices.chkEmails = _data.WithEmails;

	                                /*
	                                                _choices.date_start_ = new Date(_data.date_start_ticks);
	                                                _choices.date_end_ = new Date(_data.date_end_ticks);
	                                
	                                                _choices.date_start = moment(_choices.date_start_).format("MM/DD/YYYY");
	                                                _choices.date_end = moment(_choices.date_end_).format("MM/DD/YYYY");
	                                */

	                                _choices.date_start_ = moment(_data.date_start_ticks).toDate();
	                                _choices.date_end_ = moment(_data.date_end_ticks).toDate();

	                                _choices.rbdiBusiness = _data.rbdiBusiness;
	                                _choices.rbdiIndividual = _data.rbdiIndividual;
	                                _choices.rbdiUnknown = _data.rbdiUnknown;

	                                _choices.keywords = _data.KeyWords;

	                                //                ChoicesFactory.choices = angular.extend({}, ChoicesFactory.choices, _choices);

	                                $state.go('search');
	                        });
	                };

	                //        $scope._records = [];

	                vm.gridOptions = {};
	                vm.gridOptions.appScopeProvider = vm;

	                //        vm.gridOptions.data = '_records';
	                vm.gridOptions.enableColumnResizing = true;
	                vm.gridOptions.enableFiltering = false;
	                vm.gridOptions.enableGridMenu = true;
	                vm.gridOptions.showGridFooter = false;

	                vm.gridOptions.showColumnFooter = false;
	                vm.gridOptions.showFooter = false;

	                //  agi   2017-02-04
	                //        vm.gridOptions.enablePaginationControls = false;


	                vm.gridOptions.enablePaging = true;
	                vm.gridOptions.paginationPageSizes = [10, 25, 50, 100, 200];
	                vm.gridOptions.paginationPageSize = 10;
	                vm.gridOptions.useExternalPagination = true;

	                //  agi 2017-02-05   begin

	                //        vm.gridOptions.enableColumnResizing = true;
	                //        vm.gridOptions.enableFiltering = false;
	                //        vm.gridOptions.enableGridMenu = true;
	                //        vm.gridOptions.showGridFooter = false;

	                //        vm.gridOptions.EnableSelectAll = true;
	                vm.gridOptions.enableRowSelection = true;
	                vm.gridOptions.multiSelect = false; //true;

	                vm.gridOptions.enableColumnMenus = false;
	                vm.gridOptions.enableGridMenu = false;

	                //        vm.gridOptions.showColumnFooter = false;
	                //        vm.gridOptions.fastWatch = true;


	                //        vm.gridOptions.enablePaging = true;
	                //        vm.gridOptions.paginationPageSizes = [5, 10, 25, 50, 75, 100, 200];
	                //        vm.gridOptions.paginationPageSize = 25;
	                //        vm.gridOptions.useExternalPagination = true;


	                //  agi 2017-02-05   end


	                var boolColTemplate = '<div class="text-xs-center">{{COL_FIELD == true  ? "+" : ""}}</div>';
	                var ColPhonesTemplate = '<div>{{ row.entity.WithPhones }}</div>';
	                boolColTemplate = __webpack_require__(229);

	                vm.gridOptions.columnDefs = [{
	                        name: ' ',
	                        displayName: 'Actions'
	                        //                    , cellTemplate: require('./cell-template.tpl.html')
	                        , cellTemplate: __webpack_require__(230)
	                        //, pinnedLeft: true
	                        , width: 150
	                }, { name: 'QueryID', displayName: 'Query ID', visible: false }, { name: 'ListId', displayName: 'List ID', visible: false }, { name: 'UserName', displayName: 'User Name', width: 200, visible: false },
	                //                "UserID": "34b6d23c-7ef3-4a26-8115-a2d8ae34b102", 
	                { name: "ListName", displayname: 'List Name', width: 150 /*, pinnedLeft: true*/ },
	                //                "ListCode": 1, 
	                { name: "Count", displayname: 'Record Count', width: 100 }, { name: "BeginDate", visible: true, displayname: 'Begin Date', width: 150 }, { name: "EndDate", visible: true, displayname: 'End Date', width: 150 }, {
	                        field: '_criteria',
	                        visible: true,
	                        displayName: 'Search Criteria',
	                        cellTemplate: __webpack_require__(231),
	                        width: 720
	                }

	                /*
	                  ,
	                { name: "States", visible: true, displayname: 'States', width: 150 },
	                { name: "Cities", visible: true, displayname: 'Cities', width: 150 },
	                { name: "ZipCodes",  visible: true, displayname: 'Zip Codes', width: 150 },
	                { name: "AreaCodes", visible: true, displayname: 'Area Codes', width: 150 },
	                { name: "SICCodes",  visible: true, displayname: 'SIC Codes', width: 150 },
	                { name: "GroupSICCodes", visible: true, displayname: 'Group SIC Codes', width: 150 },
	                { name: "Counties", visible: true, displayname: 'Counties', width: 150 },
	                { name: "Employees", visible: true, displayname: 'Company size', width: 150 },
	                { name: "Sales", visible: true, displayname: 'Sales volume', width: 150 },
	                { name: "RBDI", visible: true, displayname: 'RBDI', width: 150 },
	                { name: "Miles", visible: true, displayname: 'Miles', width: 100 },
	                { name: "ZipForRadius", visible: true, displayname: 'Zip For Radius', width: 100 },
	                { name: "Keyword", visible: true, width: 200 },
	                  { name : "PaymentDate",visible: false}, 
	                { name : "Amount",visible: false}, 
	                { name : "PaymentMethod",visible: false}, 
	                { name : "InvoiceNumber",visible: false}, 
	                { name: "Description", visible: false },
	                  { name: "WithContacts", visible: true, cellTemplate: boolColTemplate , displayname: 'With Contacts', width: 150 },
	                { name: "WithPhones", visible: true, cellTemplate: boolColTemplate, displayname: 'With Phones', width: 150 },
	                { name: "WithEmails", visible: true, cellTemplate: boolColTemplate, displayname: 'With Phones', width: 150 }
	                  */
	                ];

	                vm.gridOptions.rowIdentity = function (row) {
	                        return row.QueryID;
	                };
	                vm.gridOptions.getRowIdentity = function (row) {
	                        return row.QueryID;
	                };

	                vm.gridOptions.onRegisterApi = function (gridApi) {
	                        vm.gridApi = gridApi;

	                        /*
	                          gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
	                            if (vm.getPage)
	                            {
	                                vm.getPage(newPage, pageSize).then(function () { });
	                            }
	                        });
	                           */
	                };

	                function _afterregisterApi(gridApi) {
	                        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
	                                if (vm.getPage) {
	                                        vm.getPage(newPage, pageSize).then(function () {});
	                                }
	                        });
	                }

	                vm.addCriteriesColumn = function (_item) {
	                        var _choices = {};

	                        _choices.states = _.map(_item.States.match(/[A-Z]{2}/g), function (t) {
	                                return { shortname: t };
	                        });
	                        _choices.cities = _.map(_item.Cities.match(/[^,.]+?,\s*[A-Z]{2}/g), function (_itm) {
	                                var _arr = _itm.split(',');return { Name: _arr[0], State: _arr[1].trim() };
	                        });
	                        _choices.zipcodes = _.filter(_item.ZipCodes.split(','), function (t) {
	                                return t.trim().length > 0;
	                        });
	                        _choices.areacodes = _.filter(_item.AreaCodes.split(','), function (t) {
	                                return t.trim().length > 0;
	                        });
	                        _choices.counties = _.map(_item.Counties.match(/[^,.]+?,\s*[A-Z]{2}/g), function (_itm) {
	                                var _arr = _itm.split(',');return { Name: _arr[0], State: _arr[1].trim() };
	                        });

	                        _choices.siccodes = [];
	                        var _pat_sic = /(\d{2})\s+(.+)\s*/;
	                        var _xarr = _.filter(_item.GroupSICCodes.split(','), function (t) {
	                                return _pat_sic.test(t);
	                        });
	                        _choices.siccodes = _.map(_xarr, function (_itm) {
	                                var _arr = _itm.match(/(\d{2})\s+(.+)\s*/);return { code: _arr[1], name: _arr[2].trim() };
	                        });

	                        _choices.keywords = _.filter(_item.Keyword.split(','), function (t) {
	                                return t.trim().length > 0;
	                        });
	                        _choices.rbdiBusiness = /B/.test(_item.RBDI);
	                        _choices.rbdiIndividual = /R/.test(_item.RBDI);
	                        _choices.rbdiUnknown = _choices.rbdiBusiness && _choices.rbdiIndividual;

	                        _choices.zipForRadius = _item.ZipForRadius;
	                        _choices.radiusMiles = _item.Miles;
	                        _choices.companysizes = [];
	                        _choices.salesvolumes = _.filter(_item.Sales.split(','), function (t) {
	                                return t.trim().length > 0;
	                        });
	                        _choices.chkContactNames = _item.WithContacts;
	                        _choices.chkPhoneNumbers = _item.WithPhones;
	                        _choices.chkEmails = _item.WithEmails;

	                        _item.Criteries = _choices;

	                        return _item;
	                };

	                vm.getPage = function (_page, _size) {
	                        var promise = QueryHistoryService.getPage(_page, _size, vm._username);
	                        promise.then(function (data) {
	                                vm.gridOptions.totalItems = data.cntrecords;

	                                //                vm.gridOptions.data = _.col13dig2date(data.records);
	                                var _records = _.col13dig2date(data.records);
	                                vm.gridOptions.data = _.map(_records, function (_item) {
	                                        return vm.addCriteriesColumn(_item);
	                                });

	                                //                vm.gridOptions.minRowsToShow = data.cntrecords + 3;

	                                //  agi                var _len = vm.gridOptions.data.length;
	                                //  2017-02-07              vm.gridOptions.minRowsToShow = _len + 3;


	                                //                var _templates = _.col13dig2date(_data.templates);
	                                //                vm.gridOptions.data = _.map(_templates, function (_item) { return vm.addCriteriesColumn(_item); });

	                        });

	                        return promise;
	                };

	                vm.gridData = [];

	                activate();

	                function activate() {

	                        vm.getPage(1, vm.gridOptions.paginationPageSize).then(function () {
	                                _afterregisterApi(vm.gridApi);
	                        });
	                }
	        }
	        QueryHistoryController.$inject = ["$scope", "$state", "$stateParams", "$timeout", "uiGridConstants", "uiGridPaginationService", "InfoFactory", "ChoicesFactory", "QueryHistoryService", "_", "toaster", "LoginService"];

	        return QueryHistoryController;
	};

/***/ },

/***/ 229:
/***/ function(module, exports) {

	module.exports = "<div class=\"text-xs-center\" ng-if=\"COL_FIELD\">\r\n    <i class=\"fa fa-check\" ></i>\r\n</div>";

/***/ },

/***/ 230:
/***/ function(module, exports) {

	module.exports = "<div class=\"grid-action-cell  text-xs-center\">\r\n    <a ng-click=\"grid.appScope.rerun($event,row.entity)\" href=\"#\">\r\n        Rerun Query\r\n    </a>\r\n</div>\r\n";

/***/ },

/***/ 231:
/***/ function(module, exports) {

	module.exports = "<div class=\"grid-action-cell text-xs-center p-a-1\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12 text-xs-left\">\r\n            <current-criteries choices=\"row.entity.Criteries\"></current-criteries>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ },

/***/ 255:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {
	    /* @ngInject */
	    function SelectSubscriptionTypeController($scope) {

	        activate();

	        function activate() {}
	    }
	    SelectSubscriptionTypeController.$inject = ["$scope"];

	    return SelectSubscriptionTypeController;
	};

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function CreateSubscriptionController($scope, $state, $http, $q, $timeout, _, $sessionStorage, toaster, FFD_CONST, LoginService, createDialog /*, SubscrService */) {
	        var vm = this;

	        vm.is_success = false;
	        vm.in_process = false;

	        //        vm.activate_dialog = SubscriptionService.ShowFaq;


	        /*
	         */
	        vm.activate_dialog = function () {
	            //            SubscrService.ShowFaq();


	            createDialog({
	                id: 'SpecialOffer',
	                css: { top: '5vh', margin: '0 auto' },
	                template: __webpack_require__(258),
	                footerTemplate: __webpack_require__(259),
	                backdrop: true,
	                success: {
	                    label: 'Close',
	                    fn: function fn() {}
	                }
	            });
	        };

	        vm.createsubscr = function ($event) {
	            $event.preventDefault();
	            //            $sessionStorage["_subscriptiondata"] = vm.regdata;
	            vm.in_process = true;

	            LoginService.createsubscription(vm.regdata).then(function (data) {
	                vm.in_process = false;

	                if (data.result == 'ERROR') {
	                    toaster.pop('error', data.message);
	                }
	                if (data.result == 'OK') {

	                    window.dataLayer = window.dataLayer || [];
	                    window.dataLayer.push({
	                        'event': 'SuccessSubscriptionEvent',
	                        'eventCategory': 'Subscriptions',
	                        'eventAction': 'Success Credit Card Subscription',
	                        'eventLabel': location.pathname
	                    });

	                    vm.is_success = true;
	                    return;
	                    toaster.pop({
	                        type: 'success',
	                        body: 'Your transaction was successful',
	                        timeout: 0,
	                        onHideCallback: function onHideCallback() {
	                            $state.go('search');
	                        }
	                    });
	                }
	            });
	        };

	        vm.initform = InitForm;

	        vm.countries = [];

	        vm.initform().then(function (data) {
	            vm.ledStartDate = data._ledStartDate;
	            vm.ledEndDate = data._ledEndDate;
	            vm.ledFee = data._ledFee;
	        });

	        /*       
	                $scope.countries =
	                     [
	                        { name: "United States" },
	                        { name: "Canada" }
	                     ];
	          */

	        vm._months = [{ name: "Month", value: "" }, { name: "January", value: "01" }, { name: "February", value: "02" }, { name: "March", value: "03" }, { name: "April", value: "04" }, { name: "May", value: "05" }, { name: "June", value: "06" }, { name: "July", value: "07" }, { name: "August", value: "08" }, { name: "September", value: "09" }, { name: "October", value: "10" }, { name: "November", value: "11" }, { name: "December", value: "12" }];

	        vm.options = { removeChromeAutoComplete: true };

	        vm._years = [{ name: "Year", value: "" }];

	        var _currYear = new Date().getFullYear();

	        for (var i = _currYear; i < _currYear + 10; i++) {
	            vm._years.push({ name: i, value: i });
	        }

	        $timeout(function () {
	            angular.element('input[disabled]').each(function () {
	                angular.element(this).removeAttr('disabled');
	            });
	        }, 3000);

	        vm.regdata = { Country: 'United States' };

	        vm.regdataFields = [{
	            key: 'CreditCard',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Credit Card Number',
	                placeholder: 'Enter your credit card number',
	                required: true,
	                minlength: 14,
	                maxlength: 16,
	                disabled: true
	            }
	        },

	        /*
	        
	                    {
	                        key: 'ExpDate',
	                        type: 'bs4-horizontalExpDate',
	                        templateOptions:
	                            {
	                                label: 'Exp Date',
	                                required: true
	                            }
	                    },
	        */

	        /*
	                    {
	                        key: 'ExpDate',
	                        type: 'bs4-horizontalMonthPicker',
	                        templateOptions:
	                            {
	                                label: 'Expiration Date',
	                                required: true,
	                                placeholder: 'Enter expiration date',
	                            }
	        
	        
	        
	                        , watcher: {
	                            listener: function (field, newValue, oldValue, scope, stopWatching) {
	                                if (newValue) {
	        
	                                    console.log(newValue);
	                                    vm.regdata.CardYear = newValue.getFullYear();
	                                    vm.regdata.CardMonth = newValue.getMonth()+1;
	                                }
	                            }
	                        }
	        
	        
	        
	        
	                    },
	        */

	        {
	            className: "form-group exp-month-year",
	            fieldGroup: [
	            /*
	             
	             
	            {
	                className: 'col-md-3  hidden-sm-down text-sm-right',
	                template: "<label class='control-label'>Expiration Date*&nbsp;</label>"
	            },
	            */

	            {
	                className: 'col-md-5',
	                type: 'select',
	                key: 'CardMonth',
	                defaultValue: '',
	                wrapper: ['ngMessages', 'bs4hasError'],
	                templateOptions: {
	                    //                                label: 'End date month',
	                    labelProp: 'name',
	                    valueProp: 'value',
	                    options: vm._months,
	                    required: true
	                }
	            }, {
	                className: 'col-md-5',
	                type: 'select',
	                key: 'CardYear',
	                defaultValue: '',
	                wrapper: ['ngMessages', 'bs4hasError'],
	                templateOptions: {
	                    //                                    label: 'End date year',
	                    labelProp: 'name',
	                    valueProp: 'value',
	                    options: vm._years,
	                    required: true
	                }
	            }],
	            wrapper: ['horizontalBs4Label'],
	            templateOptions: { label: "Expiration Date*" }

	        },

	        /*
	        
	                    {
	                        key: 'CardYear',
	                        type: 'bs4-horizontalSelect',
	                        templateOptions: {
	                            label: 'End date year',
	                            labelProp: 'value',
	                            valueProp: 'value',
	                            options: vm._years,
	                            required: true
	                        }
	                    },
	        
	        
	        
	        
	        
	        
	        
	        
	                    {
	                        key: 'CardMonth',
	                        type: 'bs4-horizontalSelect',
	                        templateOptions: {
	                            label: 'End date month',
	                            labelProp: 'name',
	                            valueProp: 'value',
	                            options: vm._months,
	                            required: true
	                        }
	                    },
	        
	        */

	        {
	            key: 'CVV',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'password',
	                label: 'Verification Code',
	                placeholder: 'Enter verification code',
	                required: true,
	                minlength: 3,
	                maxlength: 4,
	                disabled: true
	            }
	        }, {
	            key: 'CompanyName',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Company Name',
	                placeholder: 'Enter Company name',
	                //                        minlength: 5,
	                maxlength: 40

	            }
	        }, {
	            key: 'Name',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Name',
	                placeholder: 'Enter Name (exactly as it appears on card)',
	                maxlength: 30,
	                required: true
	            },

	            watcher: {
	                listener: function listener(field, newValue, oldValue, scope, stopWatching) {
	                    if (newValue) {
	                        console.log(newValue);
	                        var _arrNames = newValue.replace(/\s+/g, " ").split(' ');
	                        if (_arrNames.length == 2) {
	                            vm.regdata.FirstName = _arrNames[0];
	                            vm.regdata.LastName = _arrNames[1];
	                        } else {
	                            vm.regdata.FirstName = newValue;
	                            vm.regdata.LastName = '.';
	                        }
	                    }
	                }
	            }

	        },

	        /*
	        
	                    {
	                        key: 'FirstName',
	                        type: "bs4-horizontalInput",
	                        templateOptions: {
	                            type: 'text',
	                            label: 'First Name',
	                            placeholder: 'Enter First Name',
	                            maxlength: 25,
	                            required: true
	                        }
	                    },
	        
	                    {
	                        key: 'LastName',
	                        type: "bs4-horizontalInput",
	                        templateOptions: {
	                            type: 'text',
	                            label: 'Last Name',
	                            placeholder: 'Enter Last Name',
	                            maxlength: 25,
	                            required: true
	                        }
	                    },
	        
	        */

	        {
	            key: 'Address',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Address',
	                placeholder: 'Enter Address',
	                //                    minlength: 5,
	                maxlength: 40,
	                required: true
	            }
	        }, {
	            key: 'City',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'City',
	                placeholder: 'Enter City',
	                required: true,
	                //                    minlength: 5,
	                maxlength: 40

	            }
	        }, {
	            key: 'State',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'State/Province/Region',
	                placeholder: 'Enter State/Province/Region',
	                minlength: 2,
	                maxlength: 25,
	                required: true
	            }
	        }, {
	            key: 'Zip',
	            type: "bs4-horizontalInput",
	            templateOptions: {
	                type: 'text',
	                label: 'Zip',
	                placeholder: 'Enter Zip',
	                minlength: 5,
	                maxlength: 12,
	                required: true
	            }
	        }, {
	            key: 'Country',
	            type: 'bs4-horizontalSelect',
	            templateOptions: {
	                label: 'Country',
	                labelProp: 'name',
	                valueProp: 'name',
	                options: [{ name: 'United States' }, { name: 'Canada' }, { name: 'United Kingdom' }], //vm.countries,
	                required: true

	            },
	            controller: ['$scope', function ($scope) {
	                vm.initform().then(function (data) {
	                    console.log('data>>', data);
	                    $scope.options.templateOptions.options = _.map(data._countries, function (item) {
	                        return { name: item };
	                    });
	                    vm.regdata.FirstName = data._edFirstName;
	                    vm.regdata.LastName = data._edLastName;

	                    vm.regdata.Address = data._edAddress;
	                    vm.regdata.City = data._edCity;
	                    vm.regdata.Zip = data._edZip;
	                    vm.regdata.State = data._edState;
	                    vm.regdata.CompanyName = data._edCompanyName;

	                    //                                var _stmp = $sessionStorage['_subscriptiondata'];
	                    //                                if (_stmp != null) vm.regdata = _stmp;

	                    //                                $scope.$apply();
	                });
	            }]

	        }];

	        function InitForm() {
	            var deferrer = $q.defer();
	            var self = this;

	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "getStartInfoForSubscription",
	                data: {}
	            });

	            request.success(function (data, status, headers, config) {
	                deferrer.resolve(data.d);
	            }).error(function (data, status, headers, config) {
	                deferrer.reject("Error !!!");
	            });

	            return deferrer.promise;
	        }
	    }
	    CreateSubscriptionController.$inject = ["$scope", "$state", "$http", "$q", "$timeout", "_", "$sessionStorage", "toaster", "FFD_CONST", "LoginService", "createDialog"];

	    return CreateSubscriptionController;
	};

/***/ },

/***/ 258:
/***/ function(module, exports) {

	module.exports = "<div class=\"col-sm-12\">\r\n \r\n  \r\n\r\n\r\n\r\n            <faq-panel title=\"Terms and Conditions\">\r\n                <faq-panel-item iditem=\"terms_01\" title=\"Permitted Uses/Restrictions\">\r\n                    FreshFinddata.com grants you a limited, non-exclusive, non-transferable\r\n                    license to use the business sales leads (“Data”) for the following permitted uses:\r\n                    <br />\r\n                    You may not sell, license, dispense, or in any other way distribute any part of\r\n                    the Data to any third party.\r\n                    <br />\r\n                    You agree to comply with all applicable federal, state, foreign and local\r\n                    statutes and regulations, including, but not limited to the CAN-SPAM Act and\r\n                    the National Do Not Call Registry. You agree to all indemnification clauses\r\n                    stated in this agreement.\r\n                    <br />\r\n                    Multiple instances of simultaneous usage from more than one location, or\r\n                    sharing your account, may result in the suspension or cancellation of your\r\n                    account. We reserve the right to terminate or restrict your use of our service and\r\n                    to terminate this Agreement, without notice.\r\n                    <br />\r\n                </faq-panel-item>\r\n                <faq-panel-item iditem=\"terms_02\" title=\"Limited Warranty Disclaimer and Limitation of Liability\">\r\n                    ALL DATA AND SERVICES PROVIDED ARE SOLD “AS IS.” NO WARRANTIES, EXPRESS OR IMPLIED,\r\n                    ARE GIVEN HEREUNDER. Under no circumstances shall the maximum liability of\r\n                    Freshfinddata.com or its affiliates and data providers including Data Owners\r\n                    exceed more than one month of subscription charges paid by you hereunder.\r\n                </faq-panel-item>\r\n                <faq-panel-item iditem=\"terms_03\" title=\"Subscription and Billing\">\r\n                    Paid subscribers receive access to up to 5,000 leads per month.\r\n                    Unused leads do not carry over to the next month.\r\n\r\n                    You authorize the Company to charge your authorized payment method\r\n                    (the “Payment Method”) the monthly subscription fee plus any applicable taxes.\r\n                    Recurring payments will automatically be drafted from the account as your\r\n                    subscription is active. We reserve the right to terminate your subscriber\r\n                    account if for any reason a Payment Method is cancelled, terminated or\r\n                    declined or if we believe a payment may be challenged or dishonored.\r\n                    You may cancel your subscription at any time.\r\n                    <br />\r\n                    It is the subscriber’s responsibility to keep all billing information current\r\n                    during the subscription period. If the Company encounters any interruption\r\n                    in payment, the subscriber will have 30 days to update the information by\r\n                    contacting the Customer Service Department.\r\n                </faq-panel-item>\r\n                <faq-panel-item iditem=\"terms_04\" title=\"Miscellaneous\">\r\n                    You agree to defend, indemnify and hold harmless Freshfinddata.com and its\r\n                    affiliates and providers against any damage, loss or expense including\r\n                    attorneys’ fees in connection with any claim that arises from this Agreement,\r\n                    or the content or effects of any communication you distribute using the Data.\r\n                    <br />\r\n                    The Site and the information on it are the property of Freshfinddata.com and\r\n                    its affiliates. The unauthorized copying or dissemination of any Freshfinddata.com\r\n                    copyright, trademark, or service mark is prohibited by United States copyright law,\r\n                    trademark law and other intellectual property laws and conventions.\r\n                    <br />\r\n                    Company and you agree to submit any and all claims, demands, disputes,\r\n                    controversies, or causes of action, arising out of or relating to this Agreement,\r\n                    (Individually and collectively “Claims”), to binding arbitration before the\r\n                    American Arbitration Association (“AAA”).\r\n                </faq-panel-item>\r\n                <faq-panel-item iditem=\"terms_05\" title=\"Money Back Guarantee\">\r\n                    The Money Back Guarantee is limited to the discretion of the Company and is\r\n                    not available for subscribers that have downloaded any amount of sales leads.\r\n                    Once your account is cancelled, all saved searches and sales leads, as well as\r\n                    any remaining credits, will be deleted and you will no longer have access to\r\n                    the account.\r\n                    <br />\r\n                    Monthly Subscribers:\r\n                    <br />\r\n                    Within the first 30 days of subscription start date:\r\n                    If you have not downloaded any sales leads, you can receive a full refund for\r\n                    the first month of your subscription.\r\n                    <br />\r\n                    After the first 30 days of subscription start date:\r\n                    If you have not downloaded any sales leads in the current month, you can cancel\r\n                    at any time and receive a full refund for the current month.\r\n                    <br />\r\n                    Please contact customerservice@freshfinddata.com if you have any questions.\r\n                    <br />\r\n                    We may amend these terms and conditions by posting the revised terms on the\r\n                    company website. You are responsible and agree to check for any changes on each\r\n                    occasion before using the Site or any Data that we provide you.\r\n                </faq-panel-item>\r\n            </faq-panel>\r\n\r\n\r\n\r\n\r\n\r\n\r\n</div>\r\n";

/***/ },

/***/ 259:
/***/ function(module, exports) {

	module.exports = "<div class=\"col-xs-12 text-center\">\r\n    <button class=\"btn  btn-xs  btn-warning\" ng-click=\"$modalSuccess()\">\r\n        {{$modalSuccessLabel}}\r\n    </button>\r\n</div>\r\n";

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function CreatePaypalSubscriptionController($scope, $state, $http, $q, _, $sessionStorage, toaster, FFD_CONST, LoginService, createDialog /* , SubscrService*/) {

	        var vm = this;
	        vm.confirm = false;
	        vm.initform = InitForm;
	        vm.confirm = false;

	        vm.initform().then(function (data) {
	            if (data.result == "SKIP") {
	                var _msg = data.message || "You already have active subscription !";
	                toaster.pop({
	                    type: 'info',
	                    body: _msg,
	                    timeout: 0,
	                    onHideCallback: function onHideCallback() {
	                        $state.go('search');
	                    }
	                });

	                return;
	            }
	            vm.ledStartDate = data._ledStartDate;
	            vm.ledEndDate = data._ledEndDate;
	            vm.ledFee = data._ledFee;
	            vm.paypalUrl = data.paypalUrl;
	        });

	        //        vm.activate_dialog = SubscrService.ShowFaq;


	        vm.activate_dialog = function () {
	            createDialog({
	                id: 'SpecialOffer',
	                css: { top: '5vh', margin: '0 auto' },
	                template: __webpack_require__(258),
	                footerTemplate: __webpack_require__(259),
	                backdrop: true,
	                success: {
	                    label: 'Close',
	                    fn: function fn() {}
	                }
	            });
	        };

	        vm.createsubscr = function ($event) {};

	        activate();

	        function activate() {}

	        function InitForm() {
	            var deferrer = $q.defer();
	            var self = this;

	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "getStartInfoForPaypalSubscription",
	                data: {}
	            });

	            request.success(function (data, status, headers, config) {
	                deferrer.resolve(data.d);
	            }).error(function (data, status, headers, config) {
	                deferrer.reject("Error !!!");
	            });
	            return deferrer.promise;
	        }
	    }
	    CreatePaypalSubscriptionController.$inject = ["$scope", "$state", "$http", "$q", "_", "$sessionStorage", "toaster", "FFD_CONST", "LoginService", "createDialog"];

	    return CreatePaypalSubscriptionController;
	};

/***/ },

/***/ 263:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */

	    function SuccessCreatePaypalSubscriptionController($scope, $state, $stateParams, $localStorage, toaster, LoginService) {

	        var vm = this;

	        vm.createsubscr = function () {
	            /*
	            var _params = $stateParams;
	            if ($localStorage['successcreatepaypalsubscription'])
	            {
	                _params = $localStorage['successcreatepaypalsubscription'];
	                delete $localStorage['successcreatepaypalsubscription'];
	            }
	            */

	            LoginService.createpaypalsubscription($stateParams).then(function (data) {

	                if (data.result == 'ERROR') {
	                    vm.result = data.result;
	                    vm.message = data.message;
	                }

	                if (data.result == 'OK') {
	                    window.dataLayer = window.dataLayer || [];
	                    window.dataLayer.push({
	                        'event': 'SuccessSubscriptionEvent',
	                        'eventCategory': 'Subscriptions',
	                        'eventAction': 'Success PayPal Subscription',
	                        'eventLabel': location.pathname
	                    });

	                    vm.result = data.result;
	                    vm.message = data.message;
	                    toaster.pop({ type: 'success', body: 'Your transaction was successful', timeout: 0 });
	                }

	                if (data.result == 'SKIP') {

	                    var _msg = data.message || "You already have active subscription !";
	                    toaster.pop({
	                        type: 'info',
	                        body: _msg,
	                        timeout: 0,
	                        onHideCallback: function onHideCallback() {
	                            $state.go('search');
	                        }
	                    });

	                    return;

	                    //                     $state.go(data.return_url);
	                }
	            });
	        };

	        vm.createsubscr();
	    }
	    SuccessCreatePaypalSubscriptionController.$inject = ["$scope", "$state", "$stateParams", "$localStorage", "toaster", "LoginService"];

	    return SuccessCreatePaypalSubscriptionController;
	};

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function _CreateBitPaySubscriptionController($scope, $sce, $state, $http, $q, _, $sessionStorage, toaster, FFD_CONST, LoginService, createDialog /*, SubscrService*/) {

	        var vm = this;
	        vm.loadedData = false;
	        vm.confirm = false;
	        vm.initform = InitForm;
	        vm.bitpayurl = "";

	        vm.initform().then(function (data) {
	            vm.loadedData = true;
	            if (data.result == "SKIP") {
	                var _msg = data.message || "You already have active subscription !";
	                toaster.pop({
	                    type: 'info',
	                    body: _msg,
	                    timeout: 0,
	                    onHideCallback: function onHideCallback() {
	                        $state.go('search');
	                    }
	                });

	                return;

	                toaster.pop("info", "You already have subscription !");
	                $state.go("search");
	            }

	            if (data.result == "ERROR") {
	                toaster.pop("error", data.message);
	            }

	            if (data.result == "OK") {

	                var _data = data.data;

	                vm.result = _data.result;
	                vm.Amount = _data.Amount;
	                vm.StartDate = _data.StartDate;
	                vm.EndDate = _data.EndDate;
	                vm.TotalPayments = _data.TotalPayments;
	                vm.StartSubscrDate = _data.StartSubscrDate;
	                vm.EndSubscrDate = _data.EndSubscrDate;
	                vm.PostBackUrl = _data.PostBackUrl;
	                vm.bitpayurl = $sce.trustAsResourceUrl(vm.PostBackUrl + "&view=iframe");
	            }
	        });

	        //        vm.activate_dialog = SubscrService.ShowFaq;


	        vm.activate_dialog = function () {
	            createDialog({
	                id: 'SpecialOffer',
	                css: { top: '5vh', margin: '0 auto' },
	                template: __webpack_require__(258),
	                footerTemplate: __webpack_require__(259),
	                backdrop: true,
	                success: {
	                    label: 'Close',
	                    fn: function fn() {}
	                }
	            });
	        };

	        vm.createsubscr = function ($event) {};

	        function InitForm() {
	            var deferrer = $q.defer();
	            var self = this;

	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "CreateBitcoinSubscription",
	                data: {}
	            });

	            request.success(function (data, status, headers, config) {
	                deferrer.resolve(data.d);
	            }).error(function (data, status, headers, config) {
	                deferrer.reject("Error !!!");
	            });
	            return deferrer.promise;
	        }
	    }
	    _CreateBitPaySubscriptionController.$inject = ["$scope", "$sce", "$state", "$http", "$q", "_", "$sessionStorage", "toaster", "FFD_CONST", "LoginService", "createDialog"];

	    return _CreateBitPaySubscriptionController;
	};

/***/ },

/***/ 268:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function _CreateBitcoinMonthlyFeeController($scope, $sce, $state, $http, $q, _, $sessionStorage, toaster, FFD_CONST, LoginService) {

	        var vm = this;
	        vm.loadedData = false;
	        vm.result = "";
	        vm.message = "";
	        vm.confirm = false;
	        vm.bitpayurl = "";
	        vm.initform = InitForm;
	        vm.reger_data = function () {
	            vm.loadedData = false;
	            vm.initform().then(function (data) {
	                vm.loadedData = true;

	                vm.result = data.result;

	                if (data.result == "ERROR") {
	                    vm.message = data.message;
	                    toaster.pop("error", data.message);
	                }

	                if (data.result == "OK") {
	                    var _data = data.data;

	                    vm.result = _data.result;
	                    vm.Amount = _data.Amount;
	                    vm.StartDate = _data.StartDate;
	                    vm.EndDate = _data.EndDate;
	                    vm.PaymentNum = _data.PaymentNum;
	                    vm.PostBackUrl = _data.PostBackUrl;
	                    vm.bitpayurl = $sce.trustAsResourceUrl(vm.PostBackUrl + "&view=iframe");
	                }
	            });
	        };

	        vm.reger_data();

	        vm.refresh_data = function ($event) {
	            $event.preventDefault();
	            vm.reger_data();
	        };

	        function InitForm() {
	            var deferrer = $q.defer();
	            var self = this;

	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "CreateBitcoinMonthluFee",
	                data: {}
	            });

	            request.success(function (data, status, headers, config) {
	                deferrer.resolve(data.d);
	            }).error(function (data, status, headers, config) {
	                deferrer.reject("Error !!!");
	            });
	            return deferrer.promise;
	        }
	    }
	    _CreateBitcoinMonthlyFeeController.$inject = ["$scope", "$sce", "$state", "$http", "$q", "_", "$sessionStorage", "toaster", "FFD_CONST", "LoginService"];

	    return _CreateBitcoinMonthlyFeeController;
	};

/***/ },

/***/ 270:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function _CommitBitcoinUserPaymentController($scope, $state, $http, $q, _, $sessionStorage, toaster, FFD_CONST, LoginService) {

	        var vm = this;
	        vm.loadedData = false;
	        vm.result = "";
	        vm.message = "";
	        vm.confirm = false;
	        vm.initform = InitForm;
	        vm.reger_data = function () {
	            vm.loadedData = false;
	            vm.initform().then(function (data) {
	                vm.loadedData = true;

	                vm.result = data.result;

	                if (data.result == "NEED_MORE") {
	                    toaster.pop("info", "Need more payment !");
	                    $state.go("createbitcoinmonthlyfee");
	                }

	                if (data.result == "ERROR") {
	                    vm.message = data.message;
	                    //                toaster.pop("error", data.message);
	                }

	                if (data.result == "OK") {

	                    window.dataLayer = window.dataLayer || [];
	                    window.dataLayer.push({
	                        'event': 'SuccessSubscriptionEvent',
	                        'eventCategory': 'Subscriptions',
	                        'eventAction': 'Success Bitcoin Subscription',
	                        'eventLabel': location.pathname
	                    });

	                    vm.message = "Thank you! You can start working with site.";
	                    var _data = data.data;
	                    toaster.pop({
	                        type: 'success',
	                        body: 'Your transaction was successful',
	                        timeout: 0,
	                        onHideCallback: function onHideCallback() {
	                            $state.go('search');
	                        }
	                    });
	                }
	            });
	        };

	        vm.reger_data();

	        vm.refresh_data = function ($event) {
	            $event.preventDefault();
	            vm.reger_data();
	        };

	        function InitForm() {
	            var deferrer = $q.defer();
	            var self = this;

	            var request = $http({
	                method: "post",
	                url: FFD_CONST.API_BASE_URL + "CommitBitcoinUserPayment",
	                data: {}
	            });

	            request.success(function (data, status, headers, config) {
	                deferrer.resolve(data.d);
	            }).error(function (data, status, headers, config) {
	                deferrer.reject("Error !!!");
	            });
	            return deferrer.promise;
	        }
	    }
	    _CommitBitcoinUserPaymentController.$inject = ["$scope", "$state", "$http", "$q", "_", "$sessionStorage", "toaster", "FFD_CONST", "LoginService"];

	    return _CommitBitcoinUserPaymentController;
	};

/***/ },

/***/ 272:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {

	    /* @ngInject */
	    function _GetSubscriptionFullInfoController($scope, $state, $http, $q, _, $sessionStorage, toaster, FFD_CONST, LoginService /*, uuid2*/) {

	        function s4() {
	            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	        }

	        function newguid() {
	            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	        }

	        var vm = this;
	        vm.info = {};
	        vm.data = {};
	        vm.data2 = {};

	        vm.getsubscrinfo = function () {
	            LoginService.getActiveSubscriptionFullInfo().then(function (data) {

	                vm.info = data;
	                if (data.result != "OK") return;
	                vm.data = {
	                    'event': 'transaction',
	                    'transactionId': 'order-123',
	                    'transactionAffiliation': 'web',
	                    'transactionTotal': '107.98',
	                    'transactionShipping': '2.99',
	                    'transactionTax': '2',
	                    'transactionCurrency': 'GBP',
	                    'transactionProducts': [{ 'name': 'Blue_t-shirt', 'sku': '1001', 'category': 'ts', 'price': '4.99', 'quantity': '1' }, { 'name': 'Red_shoes', 'sku': '1002', 'category': 'shoes', 'price': '50.00', 'quantity': '2' }],
	                    'transactionCity': 'London',
	                    'transactionCountry': 'United Kingdom'
	                };

	                vm.data = {
	                    'event': 'transaction',
	                    'transactionId': newguid(),
	                    'transactionAffiliation': data.info.SubscriprtionType,
	                    'transactionTotal': '29.00',
	                    //                          'transactionShipping': '2.99',
	                    //                          'transactionTax': '2',
	                    'transactionCurrency': 'USD',
	                    //                          'transactionCity': 'London',
	                    'transactionCountry': 'United States'
	                };
	            });
	        };

	        vm.put2GTM = function () {
	            vm.data.transactionId = newguid();
	            dataLayer.push(vm.data);
	        };

	        vm.put2GTM2 = function () {
	            vm.data2 = {
	                'event': 'transaction',
	                'transactionId': newguid(),
	                'transactionAffiliation': 'web',
	                'transactionTotal': '107.98',
	                'transactionShipping': '2.99',
	                'transactionTax': '2',
	                'transactionCurrency': 'USD',
	                'transactionProducts': [{ 'name': 'Blue_t-shirt', 'sku': '1001', 'category': 'ts', 'price': '4.99', 'quantity': '1' }, { 'name': 'Red_shoes', 'sku': '1002', 'category': 'shoes', 'price': '50.00', 'quantity': '2' }],
	                'transactionCity': 'New York',
	                'transactionCountry': 'United States'
	            };
	            dataLayer.push(vm.data2);
	        };
	    }
	    _GetSubscriptionFullInfoController.$inject = ["$scope", "$state", "$http", "$q", "_", "$sessionStorage", "toaster", "FFD_CONST", "LoginService"];

	    return _GetSubscriptionFullInfoController;
	};

/***/ },

/***/ 287:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (app) {
	    /* @ngInject */
	    function _NewsLetterController($scope, toaster) {
	        var vm = this;
	        vm.page = 1;

	        vm.gotopage = function (_page) {
	            vm.page = _page;
	            if (vm.page < 1) vm.page = 4;
	            if (vm.page > 4) vm.page = 1;
	        };

	        vm.next = function () {
	            vm.gotopage(vm.page + 1);
	        };

	        vm.prev = function () {
	            vm.gotopage(vm.page - 1);
	        };

	        /*
	                vm.cal_expert = function () {
	                    if (!window.Tawk_API) {
	                        toaster.pop('info', 'Tawk API not loade!');
	                        return false;
	                    }
	                    Tawk_API.toggle();
	                    return false;
	                }
	         */
	    }
	    _NewsLetterController.$inject = ["$scope", "toaster"];

	    return _NewsLetterController;
	};

/***/ }

});