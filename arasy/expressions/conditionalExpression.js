var conditionalOperatorParser = function ( expressionParser, left, token ) {
    var rs = {
        type: 'ConditionalExpression'
    };
    var conditionalOpPrecedence = getPrecedenceByToken( token );
    rs.left = left;
    rs.consequentPart = expressionParser.parse( 0 );
    expectValue(':', expressionParser.scanner.nextToken());
    rs.alternate = expressionParser.parse( 0 );
    return rs;
};

arasy.expressionParser.registerInfixParselet(expressionTokenMap.conditionalOperator, conditionalOperatorParser);
