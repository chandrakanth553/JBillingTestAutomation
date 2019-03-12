import * as CS from 'CareSource';
import * as $ from 'jQuery';

declare global {
    function s<T>(someObject: T | null | undefined, defaultValue?: T | null | undefined) : T;
  }

const _global = (window /* browser */ || global /* node */) as any

export class kendoGrid {
    options: any;
    isInAddTitle(field, fieldNames): boolean {
        if (Array.isArray(fieldNames)) {
            let exist = $.grep(fieldNames, (f) => f.toLowerCase() === field.toLowerCase());
            return exist.length > 0;
        } else {
            return field === fieldNames;
        }
    }

    convertToObject(array) {
        let result = {}, item, idx, length;

        for (idx = 0, length = array.length; idx < length; idx++) {
            item = array[idx];
            result[item.value] = item.text;
        }
        return result;
    };

    cellTemplate(column, state, fieldName) {
        let settings = $.extend({}, _global.kendo.Template, this.options.templateSettings),
                        template = column.template,
                        paramName = settings.paramName,
                        field = column.field,
                        html = "",
                        idx,
                        length,
                        format = column.format,
                        type = typeof template,
                        columnValues = column.values,
                        formatRegExp = /(\}|\#)/ig,
                        templateHashRegExp = /#/ig;
                        if (column.command) {
                            if (this.isArray(column.command)) {
                                for (idx = 0, length = column.command.length; idx < length; idx++) {
                                    html += this._createButton(column.command[idx]);
                                }
                                return html.replace(templateHashRegExp, "\\#");
                            }
                            return this._createButton(column.command).replace(templateHashRegExp, "\\#");
                        }
                        if (type === "function") {
                            state.storage["tmpl" + state.count] = template;
                            html += "#=this.tmpl" + state.count + "(" + paramName + ")#";
                            state.count++;
                        } else if (type === "string") {
                            html += template;
                        } else if (columnValues && columnValues.length && $.isPlainObject(columnValues[0]) && "value" in columnValues[0] && field) {
                            html += "#var v =" + _global.kendo.stringify(this.convertToObject(columnValues)) + "#";
                            html += "#var f = v[";
    
                            if (!settings.useWithBlock) {
                                html += paramName + ".";
                            }
    
                            html += field + "]#";
    
                            var value = "${f != null ? f : ''}";
                            var title =this.isInAddTitle(column.field, fieldName) ? "title='" + value + "'" : "";
                            html += "<span " + title + ">" + value + "</span>";
                         
                        } else {
                           
                            html += column.encoded ? "#:" : "#=";
    
                            if (format) {
                                html += 'kendo.format(\"' + format.replace(formatRegExp, "\\$1") + '\",';
                            }
    
                            if (field) {
                                field = _global.kendo.expr(field, paramName);
                                html += field + "==null?'':" + field;
                            } else {
                                html += "''";
                            }
    
                            if (format) {
                                html += ")";
                            }
    
                            html += "#";
                            var title = this.isInAddTitle(column.field, fieldName) ? "title='" + html + "'" : "";
                            html = "<span " + title + ">" + html + "</span>";
                           
                        }
    
                        return html;
    }
}
