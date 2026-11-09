// 3막 시작·엔딩 컷신 자막 (그림 한 장에 자막을 한 줄씩, 클릭하면 다음)
// intro: Claude Code가 쓴 자막 — 승인됨(승인대기 [68]). reconcile 두 줄은 ACT3_PLAN 6단계 문장 그대로.
// reconcile·complete·epilogue는 6단계에서 제대로 만들 때까지 장면 흐름 확인용으로 둔다.
DIALOGUE.Act3Story = {
  intro: [
    { image: 'cut/act3_intro', caption: '마법사가 남긴 쪽지를 따라 내려간 땅속 깊은 곳, 수정이 빛나는 빛의 심연이 펼쳐졌다.' },
    { image: 'cut/act3_intro', caption: '이곳에서는 빛과 물질의 법칙마저 뒤틀려 있다고 한다.' },
    { image: 'cut/act3_intro', caption: '마법서의 찢긴 장은 이제 여섯 장. 마지막 장들이 이 어둠 어딘가에 있다.' },
    { image: 'cut/act3_intro', caption: '이안과 가론은 심연으로 내려가는 계단에 첫발을 내디뎠다.' },
  ],
  reconcile: [
    { image: 'bg/abyss_end', caption: '마법사: "사람들이 법칙을 의심 없이 외우기만 하는 게 싫었어."' },
    { image: 'bg/abyss_end', caption: '이안: "의심하는 건 좋아. 대신 실험으로 확인해야지."' },
  ],
  epilogue: [
    { image: 'cut/epilogue', caption: '새 책 두 권 — 「역학과 에너지」, 「전자기와 양자」' },
  ],
};
