# 팀 프로젝트(스터디) - 게시판 만들기


## 목적

CRUD, 협업 방식 학습


---

## 개발 환경

스프링부트 -> JPA, MariaDB


---

## DB 이용 안내

- 개발 단계에선 DB 배포 없이 개인 로컬 DB 이용

- 전체 프로젝트 실행 시 오류 안나고 테스트 하기 위해서는 각자 DB 설치, 설정 필수(백엔드는 개인 컴퓨터에 설정 필수, 프론트엔드는 전체 프로젝트 실행이 아니라 html,css,js만 따로 실행할 경우 설정 안해도 됨)


1. MariaDB 설치 (참고: https://www.youtube.com/watch?v=zOropZAzviQ&list=PLZzruF3-_clsWF2aULPsUPomgolJ-idGJ&index=3)

   
2. CMD에서 appliacion.yml 내용에 맞게 다음 순서대로 명령어 작성

1) CREATE DATABASE boardstudy;

2) USE boardstudy;

3) CREATE USER 'user1'@'localhost' IDENTIFIED BY '1234';

4) GRANT ALL PRIVILEGES ON boardstudy.* TO 'user1'@'localhost';

5) FLUSH PRIVILEGES;
![스크린샷 2025-02-04 150150](https://github.com/user-attachments/assets/53d76358-c8bf-426f-92b6-b5d309ce2839)

(mySQL workbench 설치 시 생성된 거 확인 가능, sql 추출 편함 / 5개 명령어만 치고 사진처럼 ok 뜨면 cmd창은 꺼도 됨)


3. 이후 프로젝트 전체 실행하면 오류 없이 실행 중으로 뜨면서 크롬 창 등에다가 http://localhost:8080 입력하면 게시판이라는 이름으로 흰색 빈 화면이 뜨면 성공!!

---
