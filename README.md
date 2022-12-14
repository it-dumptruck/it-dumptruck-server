# IT dumptruck API Server

## GET /auth
JWT 토큰 발급 요청

### parameter
없음

### header
* uid : 공개 토큰(필수 X)

### response
#### status code : 200
```
{
    uid: "23jfviox3", //유효한 uid 입력시 동일한 uid 반환. 미입력시 무작위로 생성된 uid 반환
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0In0.pb9s5hMjqlksgj6gPASw1A5e4LpVNxBWHoQo2mKvgdQ", //발급된 JWT 토큰
    lastAccessed: {
        dumpID: '9a6de53f1daf252e41c720bfbb73e4b47a4d0407',
        questionID: '11vmwwoxiv'
    }
}
```

#### status code : 400
크롤링 의심 등으로 인해 토큰 발급에 실패한 경우.

## GET /dumps
덤프 리스트 조회

### parameter
없음

### header
* token : JWT 토큰

### response
#### status code : 200
```
{
    dumps: [
        {
            groupName: 'Amazon',
            dumps: [
                {
                    dumpID: '9a6de53f1daf252e41c720bfbb73e4b47a4d0407',
                    dumpName: 'Solution Architect Associate (C02)',
                    image: 'https://dumptruck-assets.s3.ap-northeast-2.amazonaws.com/icons/saa.png',
                    lastUpdated: 1628178571
                }
            ]
        }
    ]
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

## GET /dumps/{dump_id}
문제 리스트 조회

### parameter
* dump_id : 덤프 아이디

### header
* token : JWT 토큰

### response
#### status code : 200
```
{
    dump: {
        dumpID: '9a6de53f1daf252e41c720bfbb73e4b47a4d0407',
        dumpName: 'Solution Architect Associate (C02)',
        image: 'https://dumptruck-assets.s3.ap-northeast-2.amazonaws.com/icons/saa.png',
        lastUpdated: 1628178571
    },
    lists: [
        {
            id: 1, //문제 번호 (화면 표시용)
            questionID: 'svj23oxie', //문제 요청시 사용하는 문제 토큰(문제 번호와 다를 수 있음)
            question: "문제 (... 포함 최대 90자)",
            marked: true
        }
    ]
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

#### status code : 404
존재하지 않는 덤프 아이디인 경우

## GET /dumps/{dump_id}/{question_id}
개별 문제 조회

### parameter
* dump_id : 덤프 아이디
* question_id : 문제 아이디. 미 입력시 첫 번째 문제 조회.

### header
* token : JWT 토큰
* type : sequence(기본값) / random / marked

### response
#### status code : 200
```
{
    id: 123, //문제 번호 (화면 표시용)
    questionID: 'asdfwef', //문제 요청시 사용하는 문제 토큰(문제 번호와 다를 수 있음)
    question: "문제",
    question_en: "Question",
    answer: [“A", "C"],
    list: [“보기A", “보기B", “보기C", “보기D"],
    list_en: [“A", “B", “C", “D"],
    prev_id: "4", //이전 문제의 question_id (없을경우 null)
    next_id: "6", //다음 문제의 question_id (없을경우 null)
    description: “해설(없을수도있음 없으면 null)",
    marked: true, //마킹 여부
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

#### status code : 404
존재하지 않는 덤프 아이디인 경우
question_id이 잘못된 경우

## GET /dumps/{dump_id}/{question_id}/{amount}
개별 문제 여러개 조회

### parameter
* dump_id : 덤프 아이디
* question_id : 문제 아이디. 미 입력시 첫 번째 문제 조회.
* amount : 요청할 최대 문제 수 (※ 상황에 따라 요청한 문제 수와 응답 문제 수가 다를 수 있습니다.)

### header
* token : JWT 토큰
* type : sequence(기본값) / random / marked

### response
#### status code : 200
```
{
    prev_id: "4", //이전 문제의 question_id (없을경우 null)
    next_id: "6", //다음 문제의 question_id (없을경우 null)
    questions: [
        {
            id: 123, //문제 번호 (화면 표시용)
            questionID: 'asdfwef', //문제 요청시 사용하는 문제 토큰(문제 번호와 다를 수 있음)
            question: "문제",
            question_en: "Question",
            answer: [“A", "C"],
            list: [“보기A", “보기B", “보기C", “보기D"],
            list_en: [“A", “B", “C", “D"],
            description: “해설(없을수도있음 없으면 null)",
            marked: true, //마킹 여부
        },
        ...
    ]
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

#### status code : 404
존재하지 않는 덤프 아이디인 경우
question_id이 잘못된 경우

## GET /marks/{dump_id}
마킹한 문제 리스트 조회

### parameter
* dump_id : 덤프 아이디

### header
* token : JWT 토큰

### response
#### status code : 200
```
{
    dump: {
        dumpID: '9a6de53f1daf252e41c720bfbb73e4b47a4d0407',
        dumpName: 'Solution Architect Associate (C02)',
        image: 'https://dumptruck-assets.s3.ap-northeast-2.amazonaws.com/icons/saa.png',
        lastUpdated: 1628178571
    },
    lists: [
        {
            id: 1, //문제 번호 (화면 표시용)
            questionID: 'svj23oxie', //문제 요청시 사용하는 문제 토큰(문제 번호와 다를 수 있음)
            question: "문제 (... 포함 최대 90자)",,
            marked: true
        },
        {
            id: 2, //문제 번호 (화면 표시용)
            questionID: 'v2exvew3', //문제 요청시 사용하는 문제 토큰(문제 번호와 다를 수 있음)
            question: "문제 (... 포함 최대 90자)",,
            marked: true
        }
    ]
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

#### status code : 404
존재하지 않는 덤프 아이디인 경우

## POST /marks/{dump_id}/{question_id}
마킹(별표처리)

### parameter
* dump_id : 덤프 아이디
* question_id : 문제 아이디.

### header
* token : JWT 토큰
* method : POST (등록) / DELETE (삭제)

### response
#### status code : 200
```
{
    "marked": true //처리 후 상태
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

#### status code : 404
존재하지 않는 덤프 아이디인 경우
question_id이 잘못된 경우