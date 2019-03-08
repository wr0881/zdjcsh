import { observable } from 'mobx';

class User {
    @observable isLogin = false;
    @observable userName = '';
}

const user = new User();

export default user;