const dom = require('./dom.js');
const utils = require('../utils');

module.exports = function parsePage(html){
  const $ = dom.parse(html);
  let page = {
      title: $('h1:first-child').text().trim(),
      description: $('div.paragraph,p').first().text().trim()
  };

  $('h3, h2').each(function(){
    if(!$(this).attr('id') && !$(this).attr('class')){
      let text = $(this).text();
      text = utils.hashEncode(text);
      $(this).attr('id', text)
    }
  })

  page.content = $.html();

  return page;
}