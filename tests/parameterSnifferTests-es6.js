var { getParameterNames, sniffParameterNames } = require('../util/parameterSniffer');

describe('parameter sniffing', function(){
    it('should return empty array for no params A', function(){
        assert.sameMembers([], getParameterNames(function(){ }));
    });

    it('should return empty array for no params B', function(){
        assert.sameMembers([], getParameterNames(function A(){ }));
    });

    it('should return empty array for no params C', function(){
        assert.sameMembers([], getParameterNames({ A(){ } }.A));
    });

    it('should match 1 parameter A', function(){
        assert.sameMembers(['x'], getParameterNames(function(x){ }));
    });

    it('should match 1 parameter B', function(){
        assert.sameMembers(['x'], getParameterNames(function A(x){ }));
    });

    it('should match 1 parameter C', function(){
        assert.sameMembers(['x'], getParameterNames({ A(x){ } }.A));
    });

    it('should match 2 parameters A', function(){
        assert.sameMembers(['x', 'y'], getParameterNames(function(x, y){ }));
    });

    it('should match 2 parameters B', function(){
        assert.sameMembers(['x', 'y'], getParameterNames(function A(x, y){ }));
    });

    it('should match 2 parameters C', function(){
        assert.sameMembers(['x', 'y'], getParameterNames({ A(x, y){ } }.A));
    });


});