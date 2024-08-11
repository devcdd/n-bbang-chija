# N-BBANG-CHIJA

`N빵치자`는 보다 유연하고, 다양하고, 기발한 방법으로 기분 좋은 정산을 도와줄 목적으로 만든 프로젝트입니다.

## 기술 스택
- Language: TypeScript
- Frontend: ReactJS
- Backend: NestJS + Supabase (예정)

## 기능
- 멤버 추가
  - 자리에 참여한 멤버들을 모두 추가해주면 각 멤버들의 정산 금액을 도출해 낼 수 있습니다.
  - 뒤늦게 참여했거나 금액을 적게 내야 하는 경우 이에 맞게 계산을 도와줄 로직을 구현하고 있습니다.
- 정산 방식
  - 공정한 N빵
    - 흔히 알고 있는 N빵 방식으로 재미 요소 없이 순전히 공정한 N빵을 위해 존재하는 기능입니다.
  - 몰빵
    - 랜덤하게 한 명이 모든 금액을 지불하게 됩니다.
    - 보통 술자리는 차수 개념이 있어서 어떤 식으로 구현할 지 고민 중에 있습니다.
  - 랜덤 N빵
    - 각자가 내야할 금액이 완전히 랜덤하게 정해집니다.
    - 재밌는 결과를 위해 계속해서 방식을 고민하고 있습니다.
- 카카오톡 공유하기
  - 정산 결과를 카카오톡으로 공유할 수 있도록 만들 예정입니다.
  - 결과를 이미지화 시키는 방법과 `URL`로 공유해서 바로 자신의 이름을 선택하면 내역과 함께 정산 금액을 확인할 수 있는 방식 정도를 생각하고 있습니다.