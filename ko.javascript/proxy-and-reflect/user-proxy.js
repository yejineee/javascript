const user = {
  _name: 'Guest',
  get name() {
    return this._name;
  },
};

const userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  },
});

const admin = {
  __proto__: userProxy,
  _name: 'Admin',
};

console.log(admin.name); // Guest
