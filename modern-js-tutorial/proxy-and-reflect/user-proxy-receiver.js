const user = {
  _name: 'Guest',
  get name() {
    return this._name;
  },
};

const userProxy = new Proxy(user, {
  get(...args) {
    return Reflect.get(args);
  },
});

const admin = {
  __proto__: userProxy,
  _name: 'Admin',
};

console.log(admin.name); // Admin
