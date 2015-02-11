describe('appのテスト', function() {
    it('', function() {
        var jQmock = jasmine.createSpy();
        var temp = jQuery;
       $ = jQmock;
        jQmock.andCallFake(function(selector) {
            console.log(selector);
            return {
                attr: function() {
                    return 'next-input-name';
                },
                find: function() {
                    return {
                        is: function() {
                            return true;
                        }
                    }
                }
            };
        });
        var spyInput = jasmine.createSpyObj('spyInput', ['current']);
        app.findNextInput(spyInput);
    });
});
