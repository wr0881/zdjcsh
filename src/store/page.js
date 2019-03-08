import { observable } from 'mobx';

class Page {
    @observable projectType = { projectTypeId: '', projectTypeName: '' }
    @observable sector = { sectorId: '', sectorName: '' }
}

const page = new Page();    

// autorun(_ => {
//     const { projectType } = page;
//     projectType.projectTypeId && console.log(toJS(projectType));
// })

// when(
//     _ => parseInt(page.projectType.projectTypeId) === 12
// ).then(
//     _ => { console.log('初次选中道路项目') }
// )

export default page;