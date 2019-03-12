import * as CS from 'CareSource';
import * as $ from 'jQuery';

export default class Dialog {
    options: any;
    templateId: string;
    defaultOptions: Object = {
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

    constructor() {
        if (!CS) {
            CS.error("CareSource Core Module missing.  Unable to register the DialogModule.");
        }
    }

    showDialog(options: any, message: any): void {
        let name  = '#dialog-placeholder'
        if(this.templateId) {
            name = `#${this.templateId.replace(/^#/, '')}`
        } else {
            if(message)
            $(name).html(message)
        }
        $(name).dialog(options);
    }

    mergeOptions(to, from): any {
        let propsFrom = !from ? [] : Object.keys(from);
        let propsTo =  !to ? [] : Object.keys(to);
        let merge = {};
        for (var j = 0; j < propsTo.length; j++) {
            merge[propsTo[j]] = to[propsTo[j]];
        }
        for (var i = 0; i < propsFrom.length; i++) {
            merge[propsFrom[i]] = from[propsFrom[i]];
        }

        return merge;
    }

    genericAlert(message, extendOptions): void {
        this.options = this.mergeOptions(this.defaultOptions, extendOptions);
        message = "<div style='text-align: center;padding: 30px;'>" + message + "</div>";
        this.showDialog(this.defaultOptions, message);
    };

    displayGridTableView(gridTableViewData, extendOptions): void {
        let defaultGridOps = {
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
        this.options = this.mergeOptions(defaultGridOps, extendOptions);
        let dialogGrid = $('#gridTableView').kendoGrid(this.options);
        if (this.options.addParentClass)
                dialogGrid.addClass(this.options.addParentClass);
    }

    genericGridTableView(message, extendOptions, gridOptions, gridTableViewData) {
        message = "<div id='gridTableView'><h2 style='padding:5px;'>" + message + "<h2></div>";
        this.options = this.mergeOptions(this.defaultOptions, extendOptions);

        this.showDialog(this.options, message);
        $('#dialog-placeholder').html(message).promise().done(function () {
            this.displayGridTableView(gridTableViewData, gridOptions);
        });
    };
}
