간단한 게시판 만들기 with react
===================
#### 사용 기술 : node.js, react, sass
#### 데이터베이스 : mongoDB
#### 사용된 주요한 외부 모듈 : express(웹 프레임워크), redux(프론트엔드 상태관리), bcrypt(암호화), CodeMirror(에디터)
<br />

## 기능목록
### 회원가입/로그인
#### 하단의 login 버튼을 누르면 로그인 모달이 올라와서 로그인/회원가입을 진행할 수 있습니다.
#### 회원가입 시 비밀번호는 db에 암호화(bcrypt 알고리즘)하여 저장됩니다.
![log_in](https://user-images.githubusercontent.com/24985152/47690368-2231d700-dc31-11e8-9b97-de956a0eb8e8.png)
<br />

### 게시글 쓰기
#### CodeMirror 라이브러리(아래 화면의 왼쪽 에디팅환경 제공)를 이용하여 편리한 에디팅 환경을 제공합니다.
#### 그리고 내용이 바뀔때마다 오른쪽에 실시간으로 마크다운문법을 해석하여 그 결과를 보여줍니다.
![editing](https://user-images.githubusercontent.com/24985152/47690372-265df480-dc31-11e8-8679-c42690254f8c.png)
<br />

### 게시글 수정/삭제
#### 해당 게시글을 작성한 계정으로 로그인 되어 있는 경우 게시글을 수정 또는 삭제할 수 있습니다.
![post](https://user-images.githubusercontent.com/24985152/47690381-29f17b80-dc31-11e8-80de-59ba23d69b9f.png)
<br />

### 메인화면
#### 게시글을 볼 수 있습니다. 
![main_page](https://user-images.githubusercontent.com/24985152/47690363-1e05b980-dc31-11e8-9410-482b4a6e0cf4.png)
<br />
