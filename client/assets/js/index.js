Handlebars.registerPartial('import_modal', Handlebars.templates['import_modal']);
Handlebars.registerPartial('nav', Handlebars.templates['nav']);

loadPage = function(template, data) {
    data = data || {};
    $('#main-container').html(Handlebars.templates[template](data));
};