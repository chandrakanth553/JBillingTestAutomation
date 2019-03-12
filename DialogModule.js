(function (CS, global, $) {
    function dialogModule() {
        var self = this;
        $("body").append("<div id='dialog-placeholder' style='display: none;'></div>");

        self.templateId = undefined;

        var defaultOptions = {
            dialogClass: "",
            title: "Alert!",
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ],
            height: 200,
            width: 500,
            open: function (event, ui) {
                $('body').bind('click', function () {
                    $("#popup").dialog('close');
                });
            }
        };

        var showDialog = function (options, message) {
            var name = "#dialog-placeholder";
            if (self.templateId) {
                name = "#" + self.dialogId.replace(/^#/, "");
            } else {
                if (message)
                    $(name).html(message);
            }

            $(name).dialog(options);
        };

        function mergeOptions(to, from) {
            var propsFrom = !from ? [] : Object.keys(from);
            var propsTo = !to ? [] : Object.keys(to);
            var merge = {};

            for (var j = 0; j < propsTo.length; j++) {
                merge[propsTo[j]] = to[[propsTo[j]]];
            }
            for (var i = 0; i < propsFrom.length; i++) {
                merge[propsFrom[i]] = from[propsFrom[i]];
            }

            return merge;
        }

        self.genericAlert = function (message, extendOptions) {
            this.options = mergeOptions(defaultOptions, extendOptions);

            message = "<div style='text-align: center;padding: 30px;'>" + message + "</div>";
            showDialog(this.options, message);
        };


        var displayGridTableView = function (gridTableViewData, extendOptions) {
            var defaultGridOps = {
                width: 800,
                height: 600,
                groupable: false,
                sortable: true,
                showGroupPanel: false,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                dataSource: {
                    data: gridTableViewData
                },
                page: 1
            };

            this.options = mergeOptions(defaultGridOps, extendOptions);

            var dialogGrid = $('#gridTableView').kendoGrid(this.options);

            if (this.options.addParentClass)
                dialogGrid.addClass(this.options.addParentClass);
        };

        self.genericGridTableView = function (message, extendOptions, gridOptions, gridTableViewData) {

            message = "<div id='gridTableView'><h2 style='padding:5px;'>" + message + "<h2></div>";
            this.options = mergeOptions(defaultOptions, extendOptions);

            showDialog(this.options, message);
            $('#dialog-placeholder').html(message).promise().done(function () {
                displayGridTableView(gridTableViewData, gridOptions);
            });
        };
    }
    if (CS) {
        CS.registerModule("DialogModule", dialogModule);
    } else {
        CS.error("CareSource Core Module missing.  Unable to register the DialogModule.");
    }
    return;
})(window.CS, window, jQuery);