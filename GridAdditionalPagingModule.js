(function (CS, global, $) {

    function triggerGridAdditionalPaging() {
        var self = this;
        self.pagerTop = function (id) {
            id = "#" + id.replace(/^#/, "");
            var grid = $(id).data("kendoGrid");
            var wrapper = $('<div class="k-pager-wrap k-grid-pager pagerTop" style="display: flex;justify-content: flex-end;align-content: flex-end;border: 0;background: transparent;color: transparent;"/>').insertBefore('#Grid');

            grid.pagerTop = new kendo.ui.Pager(wrapper, $.extend({}, grid.options.pageable, { dataSource: grid.dataSource }));

            var pageSizeTxt = $('.pagerTop .k-pager-sizes'), pgSzDd = pageSizeTxt.find('.k-dropdown').detach();
            pageSizeTxt.empty();
            pageSizeTxt.append(pgSzDd);

            $('.pagerTop .k-pager-info').remove();
        };
    };

    if (CS) {
        CS.registerModule("GridAdditionalPagingModule", triggerGridAdditionalPaging);
    } else {
        CS.error("CareSource Core Module missing.  Unable to register the GridAdditionalPagingModule.");
    }
    return;
}) (window.CS, window, jQuery);