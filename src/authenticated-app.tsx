import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";

/**
 * grid 和 flex 各自的应用场景
 * 1、要考虑，是一维布局 还是 还是 二维布局
 *    一般来说，一维布局用flex，二维布局用grid
 * 2、是从内容出发还是从布局出发？
 *   从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自适应
 *   从布局出发：先规划网格（数量一般比较固定），然后再把元素往里面填充
 *   从内容触发，用flex
 *   从布局出发，用grid
 */

export default function AuthenticatedApp() {
  const { logout} = useAuth();

  return (
    <Container>

      <Header>


        <button onClick={logout}>
          登出</button>
      </Header><Nav>nav

      </Nav>
      <Main>
        <ProjectListScreen />

      </Main>

      <Aside>aside</Aside>


      <Footer>
        footer</Footer>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
`;

// const PageHeader = styled.header`
//   height: 6rem;
// `;

// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `;

const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
