//objectExpressionParser
var objectExpressionParser = function( expressionParser, token ){
    var objectRs = {
        type: "ObjectExpression",
        properties: []
    };

    objectRs.properties = parseObjectExpressionElements();

    //consume }
    expressionParser.scanner.nextToken();

    return objectRs;


    function parseObjectExpressionElements(){
        var rs = [],
            item;

        while( item = parseObjectItem() ){
            rs.push( item );

            var peekToken = expressionParser.scanner.lookAhead();
            if( peekToken.value != ',' ){
                break;
            }else{
                expressionParser.scanner.nextToken();
            }
        }
        return rs;
    }

    function parseObjectItem(){
        var rs = {};

        rs.type = 'Property';
        rs.key = expressionParser.scanner.nextToken();
        //consume :
        expressionParser.scanner.nextToken();

        rs.value = expressionParser.parse(10);
        rs.kind = "init";

        return rs;
    }
};

arasy.expressionParser.registerPrefixParselet(expressionTokenMap.objectExpressionStart, objectExpressionParser);