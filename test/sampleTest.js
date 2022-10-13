describe('@Array!!', () => {
  describe('#indexOf()', () => {
    before(() => console.log('#before!!'));
    beforeEach(() => console.log('#beforeEach!!'));
    after(() => console.log('#after!!'));
    afterEach(() => console.log('-------------- #afterEach!!'));
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it('should return 1 when the value is 2', () => {
      assert.equal([1, 2, 3].indexOf(2), 1);
    });

    it('sample deepEqual user and getUser()', () => {
      assert.deepEqual(getUser(), user);
    });
  });
});
