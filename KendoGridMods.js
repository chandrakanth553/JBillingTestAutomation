(function (CS, global, $) {

    function kendoGridMods() {
        var self = this;

        function isInAddTitle(field, fieldNames) {
            if (Array.isArray(fieldNames)) {
                var exist = $.grep(fieldNames, function (f) {
                    return f.toLowerCase() === field.toLowerCase();
                });
                return exist.length > 0;
            } else {
                return field = fieldnames;
            }
        }

        self.clientTemplateOverride = function (fieldName, fn) {
            if (!fn) {

                var convertToObject = function (array) {
                    var result = {},
                        item,
                        idx,
                        length;

                    for (idx = 0, length = array.length; idx < length; idx++) {
                        item = array[idx];
                        result[item.value] = item.text;
                    }

                    return result;
                };

                global.kendo.ui.Grid.fn._cellTmpl = function (column, state) {
                    var that = this,
                        settings = $.extend({}, global.kendo.Template, that.options.templateSettings),
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
                        if (isArray(column.command)) {
                            for (idx = 0, length = column.command.length; idx < length; idx++) {
                                html += that._createButton(column.command[idx]);
                            }
                            return html.replace(templateHashRegExp, "\\#");
                        }
                        return that._createButton(column.command).replace(templateHashRegExp, "\\#");
                    }
                    if (type === "function") {
                        state.storage["tmpl" + state.count] = template;
                        html += "#=this.tmpl" + state.count + "(" + paramName + ")#";
                        state.count++;
                    } else if (type === "string") {
                        html += template;
                    } else if (columnValues && columnValues.length && $.isPlainObject(columnValues[0]) && "value" in columnValues[0] && field) {
                        html += "#var v =" + global.kendo.stringify(convertToObject(columnValues)) + "#";
                        html += "#var f = v[";

                        if (!settings.useWithBlock) {
                            html += paramName + ".";
                        }

                        html += field + "]#";

                        var value = "${f != null ? f : ''}";
                        var title = isInAddTitle(column.field, fieldName) ? "title='" + value + "'" : "";
                        html += "<span " + title + ">" + value + "</span>";
                     
                    } else {
                       
                        html += column.encoded ? "#:" : "#=";

                        if (format) {
                            html += 'kendo.format(\"' + format.replace(formatRegExp, "\\$1") + '\",';
                        }

                        if (field) {
                            field = global.kendo.expr(field, paramName);
                            html += field + "==null?'':" + field;
                        } else {
                            html += "''";
                        }

                        if (format) {
                            html += ")";
                        }

                        html += "#";
                        var title = isInAddTitle(column.field, fieldName) ? "title='" + html + "'" : "";
                        html = "<span " + title + ">" + html + "</span>";
                       
                    }

                    return html;
                };

            }


        };

    };

    if (CS) {
        CS.registerModule("KendoGridModule", kendoGridMods);
    } else {
        CS.error("CareSource Core Module missing.  Unable to register the KendoGridModule.");
    }
    return;
})(window.CS, window, jQuery);