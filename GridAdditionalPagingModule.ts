import * as CS from 'CareSource';
import * as $ from 'jQuery';

const kendo : any = undefined;

export default class triggerGridAdditionalPaging {
    pagerTop(id) {
        id = "#" + id.replace(/^#/, "");
        let grid = $(id).data("kendoGrid");
        let wrapper = $('<div class="k-pager-wrap k-grid-pager pagerTop" style="display: flex;justify-content: flex-end;align-content: flex-end;border: 0;background: transparent;color: transparent;"/>').insertBefore('#Grid');

        grid.pagerTop = new kendo.ui.Pager(wrapper, $.extend({}, grid.options.pageable, { dataSource: grid.dataSource }));

        var pageSizeTxt = $('.pagerTop .k-pager-sizes'), pgSzDd = pageSizeTxt.find('.k-dropdown').detach();
        pageSizeTxt.empty();
        pageSizeTxt.append(pgSzDd);

        $('.pagerTop .k-pager-info').remove();
    }
}
