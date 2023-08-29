import React,{lazy,Suspense,PureComponent} from 'react'
import { renderToString } from 'react-dom/server';
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd';
import style from './home.module.css'
import { asyncRouterMap } from '../../common/mapRouter';
import { filterRouter } from '../../utils/filterMap';
import { get, post } from '../../utils/request';
import { authAction,menusAction } from '../../redux/actions/authAction'; 
import { BrowserRouter,Route,NavLink ,Switch} from 'react-router-dom';
import Headers from '../../components/Headers';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class Home extends PureComponent {
  constructor() {
    super()
    this.state = {
      menuTree: []
    }
  }
  //-----------------------------------------转换字符串为组件------------------
  componentDidMount() {
    if (this.props.info.menusReducer.length) {
      let menus = this.renderMenu(this.props.info.menusReducer)
      this.setState({
        menuTree: menus
      })
    }else{
      //-----------------处理刷新redux数据丢失-------------------------------
      get('/user/getInfo').then((res)=>{
        this.props.authAction({role:res.data.role,nickname:res.data.nickname})
        this.props.menusAction(filterRouter(asyncRouterMap,res.data.role))
          let menus = this.renderMenu(this.props.info.menusReducer)
          this.setState({
            menuTree: menus
      })
    })
  }}
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <SubMenu title={item.meta.title} key={item.path} icon={item.icon} >
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path} icon={item.icon}><NavLink to={"/index"+item.path}>{item.meta.title}</NavLink></Menu.Item>
    })
  }
  //------------------------------------动态渲染路由组件--------------------------------------------------
  renderRouter=(data)=>{
    
    let arr=[];
    const handleData=(data)=>{
      data.forEach(item=>{
        if(item.children){
          handleData(item.children)
        }else{
          arr.push(<Route path={"/index"+item.path}  component={lazy(()=>import(`../../views${item.path}/Index.jsx`))} key={item.path}></Route>)
        }
      })
    };
    
    handleData(data)
    return arr
  }

  

  render() {
    const {menusReducer}=this.props.info
    console.log(this.renderRouter(menusReducer))
    return (
      <div>
        <Layout className={style.layout}>
          
          {/* {this.menuTree} */}
          <Sider className={style.side}>
            <h1 className={style.title}>好学教育</h1>
            <Menu  className={style.menu} theme="dark"  mode="inline">
              {this.state.menuTree}
            </Menu>
          </Sider>
          <Layout>
            <Header className={style.header}><Headers {...this.props}></Headers></Header>
            <Suspense fallback={<h1>loading....</h1>}>
                <Content className={style.content}>
                    {this.renderRouter(menusReducer)}
           

                </Content>  
            </Suspense>

          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect(
  state => ({ info: state }),
  {authAction,menusAction}
)(Home)