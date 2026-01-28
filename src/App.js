import React, { useState } from 'react';
import { Calendar, Type, Sparkles, Heart, Menu, X } from 'lucide-react';

// 글자수 세기 컴포넌트
function CharacterCounter() {
  const [text, setText] = useState('');
  const [limit, setLimit] = useState(1000);

  const charCount = text.length;
  const charCountNoSpace = text.replace(/\s/g, '').length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const percentage = (charCount / limit) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Type className="text-indigo-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">글자수 세기</h2>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">글자 제한 설정</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value) || 1000)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="1000"
          />
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="여기에 텍스트를 입력하세요..."
        />

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">공백 포함</p>
            <p className="text-2xl font-bold text-indigo-600">{charCount}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">공백 제외</p>
            <p className="text-2xl font-bold text-purple-600">{charCountNoSpace}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">단어 수</p>
            <p className="text-2xl font-bold text-blue-600">{wordCount}</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">진행률</p>
            <p className="text-2xl font-bold text-pink-600">{percentage.toFixed(1)}%</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {charCount} / {limit} 글자 {percentage > 100 && <span className="text-red-600 font-bold">(제한 초과!)</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

// 오늘의 운세 컴포넌트 (간소화 버전)
function FortuneTeller() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    city: ''
  });
  const [fortune, setFortune] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateFortune = () => {
    if (!formData.name || !formData.birthDate || !formData.gender || !formData.city) {
      alert('모든 정보를 입력해주세요!');
      return;
    }

    setLoading(true);

    const hash = (str) => {
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h = h & h;
      }
      return Math.abs(h);
    };

    const seed = hash(formData.name + formData.birthDate + formData.gender + formData.city + new Date().toDateString());
    const rng = (max) => (seed % max) + 1;

    const fortunes = {
      overall: [
        "오늘은 긍정적인 에너지가 넘치는 날입니다. 새로운 시작을 위한 좋은 기회가 찾아올 수 있으니 주변을 잘 살펴보세요.",
        "차분하게 하루를 시작하면 예상치 못한 행운이 찾아올 것입니다. 작은 일에도 감사하는 마음을 가지세요.",
        "활력이 넘치는 하루가 될 것입니다. 오랫동안 미뤄왔던 일을 시작하기에 좋은 날입니다."
      ],
      love: ["소중한 사람에게 마음을 표현하기 좋은 날입니다.", "주변 사람들과의 관계가 더욱 돈독해질 수 있습니다."],
      career: ["업무에서 좋은 성과를 낼 수 있는 날입니다.", "동료들과의 협력이 빛을 발할 것입니다."],
      money: ["작은 행운이 찾아올 수 있습니다.", "계획적인 소비가 중요합니다."],
      health: ["충분한 휴식을 취하세요.", "가벼운 운동이 활력을 가져다줄 것입니다."]
    };

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

    setTimeout(() => {
      setFortune({
        overall: fortunes.overall[seed % fortunes.overall.length],
        love: fortunes.love[seed % fortunes.love.length],
        career: fortunes.career[(seed * 2) % fortunes.career.length],
        money: fortunes.money[(seed * 3) % fortunes.money.length],
        health: fortunes.health[(seed * 4) % fortunes.health.length],
        luckyNumber: rng(99),
        luckyColor: colors[seed % colors.length]
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {!fortune ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-purple-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">오늘의 운세</h2>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">생년월일</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">성별</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setFormData({...formData, gender: '남성'})}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    formData.gender === '남성'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  남성
                </button>
                <button
                  onClick={() => setFormData({...formData, gender: '여성'})}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    formData.gender === '여성'
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  여성
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">태어난 도시</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="서울"
              />
            </div>

            <button
              onClick={generateFortune}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? '운세 확인 중...' : '오늘의 운세 보기'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{formData.name}님의 오늘</h2>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">종합운</h3>
              <p className="text-gray-700 leading-relaxed">{fortune.overall}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pink-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">애정운</h3>
                <p className="text-sm text-gray-700">{fortune.love}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">직업운</h3>
                <p className="text-sm text-gray-700">{fortune.career}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">금전운</h3>
                <p className="text-sm text-gray-700">{fortune.money}</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">건강운</h3>
                <p className="text-sm text-gray-700">{fortune.health}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">행운의 숫자</p>
                  <p className="text-2xl font-bold text-gray-800">{fortune.luckyNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">행운의 색상</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow" style={{backgroundColor: fortune.luckyColor}}></div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setFortune(null)}
              className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all"
            >
              다시 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 1일 1친절 컴포넌트 (간소화 버전)
function DailyKindness() {
  const [kindness, setKindness] = useState(null);
  const [showLuckyBeam, setShowLuckyBeam] = useState(false);

  const kindnessActions = [
    "엘리베이터 문을 잡아주세요",
    "지나가는 사람에게 미소 지어주세요",
    "동료에게 커피 한 잔 사주세요",
    "가족에게 감사 메시지를 보내세요",
    "편의점 직원에게 '감사합니다' 한 마디 건네세요",
    "누군가의 이야기를 진심으로 들어주세요",
    "부모님께 전화드리세요",
    "누군가를 진심으로 칭찬해주세요"
  ];

  const getTodayKindness = () => {
    const today = new Date().toDateString();
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % kindnessActions.length;
    setKindness(kindnessActions[index]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {!kindness ? (
          <div className="text-center py-12">
            <Heart className="mx-auto mb-6 text-rose-500" size={64} fill="currentColor" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">1일 1친절</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              오늘 실천할 작은 친절을 확인하세요
            </p>
            <button
              onClick={getTodayKindness}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              오늘의 친절 받기
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="inline-block p-4 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full">
                <Heart className="text-rose-500" size={48} fill="currentColor" />
              </div>
            </div>
            
            <h3 className="text-gray-500 font-medium mb-3">오늘의 친절</h3>
            <p className="text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
              {kindness}
            </p>
            
            <button
              onClick={() => setShowLuckyBeam(true)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              어제는 친절을 행하셨나요?
            </button>
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-6 text-white text-center">
          <p className="leading-relaxed">
            돈을 얻고 싶으면 돈을 풀고, 사랑을 얻고 싶으면 사랑하는 법을 배워야 합니다.<br />
            행운을 위해서는 타인에게 행운을 전해야겠죠.
          </p>
        </div>
      </div>

      {showLuckyBeam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLuckyBeam(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-center mb-6">행운빔 발사! ✨</h3>
            <div className="text-6xl text-center mb-6">🐱⚡</div>
            <p className="text-lg text-center text-gray-700 mb-6">
              당신의 친절이 세상에 행운을 가져다줍니다! 🍀
            </p>
            <button
              onClick={() => setShowLuckyBeam(false)}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-full"
            >
              감사합니다 💝
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 개인정보처리방침 페이지
function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">개인정보처리방침</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
            <p>취준생 도우미(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li>서비스 제공 및 운영</li>
              <li>웹사이트 이용 통계 분석</li>
              <li>사용자 문의 응대</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. 수집하는 개인정보의 항목</h2>
            <p>회사는 기본적으로 별도의 회원가입 없이 서비스를 제공하고 있으며, 다음과 같은 정보가 자동으로 수집될 수 있습니다.</p>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li>쿠키(Cookie) 및 접속 IP 정보</li>
              <li>방문 일시, 서비스 이용 기록</li>
              <li>기기 정보 (브라우저 종류, OS 등)</li>
            </ul>
            <p className="mt-2">※ 회사는 사용자의 이름, 이메일, 전화번호 등 개인 식별 정보를 직접 수집하지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
            <p className="mt-2">자동 수집되는 정보는 서비스 제공 목적 달성 시까지 보유하며, 통계 분석 목적의 데이터는 익명화하여 보관합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. 쿠키(Cookie)의 운용</h2>
            <p>회사는 사용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li>쿠키는 웹사이트를 운영하는데 이용되는 서버가 사용자의 컴퓨터 브라우저에게 보내는 소량의 정보입니다.</li>
              <li>사용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저에서 옵션을 설정함으로써 쿠키를 거부할 수 있습니다.</li>
              <li>단, 쿠키의 저장을 거부할 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. 광고 서비스</h2>
            <p>본 웹사이트는 Google 애드센스(AdSense) 광고를 게재하고 있으며, Google은 광고 게재를 위해 쿠키를 사용할 수 있습니다.</p>
            <p className="mt-2">Google의 광고 및 콘텐츠 개인 최적화, 광고 효과 측정, 잠재고객 통계에 쿠키가 사용됩니다. 사용자는 <a href="https://www.google.com/settings/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google 광고 설정</a>에서 개인 최적화 광고를 선택 해제할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. 개인정보 보호책임자</h2>
            <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-2">
              <p><strong>개인정보 보호책임자</strong></p>
              <p>이메일: contact@job-helper.com</p>
              <p>전화번호: 010-XXXX-XXXX</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. 개인정보 처리방침 변경</h2>
            <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
            <p className="mt-2"><strong>시행일자: 2025년 1월 27일</strong></p>
          </section>
        </div>
      </div>
    </div>
  );
}

// 이용약관 페이지
function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">이용약관</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제1조 (목적)</h2>
            <p>이 약관은 취준생 도우미(이하 "회사")가 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제2조 (용어의 정의)</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>"서비스"</strong>란 회사가 제공하는 취업 준비 지원 도구 및 관련 부가 서비스 일체를 의미합니다.</li>
              <li><strong>"이용자"</strong>란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
              <li><strong>"콘텐츠"</strong>란 서비스 내에서 제공되는 정보, 텍스트, 그래픽, 이미지 등 모든 자료를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제3조 (약관의 효력 및 변경)</h2>
            <p>① 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</p>
            <p className="mt-2">② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경된 약관은 시행일 7일 전에 공지합니다.</p>
            <p className="mt-2">③ 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제4조 (서비스의 제공)</h2>
            <p>회사는 다음과 같은 서비스를 제공합니다:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>자소서 일정 관리 도구</li>
              <li>글자수 세기 도구</li>
              <li>오늘의 운세 서비스</li>
              <li>1일 1친절 콘텐츠</li>
              <li>기타 취업 준비 지원 관련 서비스</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제5조 (서비스의 변경 및 중단)</h2>
            <p>① 회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.</p>
            <p className="mt-2">② 회사는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수 있습니다:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>시스템 점검, 보수, 교체 시</li>
              <li>통신 장애 발생 시</li>
              <li>천재지변, 비상사태 등 불가항력적 사유 발생 시</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제6조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>타인의 정보 도용</li>
              <li>회사가 제공하는 정보의 무단 변경</li>
              <li>회사가 정한 정보 이외의 정보 송신 또는 게시</li>
              <li>회사 또는 제3자의 저작권 등 지적재산권 침해</li>
              <li>회사 또는 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제7조 (저작권의 귀속)</h2>
            <p>① 회사가 제작한 서비스 내의 모든 콘텐츠에 대한 저작권 및 기타 지적재산권은 회사에 귀속됩니다.</p>
            <p className="mt-2">② 이용자는 회사가 제공하는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 등 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제8조 (면책조항)</h2>
            <p>① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
            <p className="mt-2">② 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</p>
            <p className="mt-2">③ 회사는 서비스를 통해 제공되는 정보의 정확성, 신뢰성 등에 대해서는 보증하지 않으며, 이용자는 본인의 판단과 책임 하에 서비스를 이용해야 합니다.</p>
            <p className="mt-2">④ 회사는 이용자 간 또는 이용자와 제3자 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제9조 (광고 게재)</h2>
            <p>① 회사는 서비스 운영과 관련하여 서비스 화면, 홈페이지 등에 광고를 게재할 수 있습니다.</p>
            <p className="mt-2">② 이용자는 서비스 이용 시 노출되는 광고에 대해 동의하는 것으로 간주됩니다.</p>
            <p className="mt-2">③ 회사는 광고 내용에 대한 책임을 지지 않으며, 이용자가 광고를 통해 외부 사이트를 이용하거나 광고주와 거래할 경우 발생하는 문제에 대해 책임지지 않습니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">제10조 (분쟁의 해결)</h2>
            <p>① 회사와 이용자는 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.</p>
            <p className="mt-2">② 전항의 노력에도 불구하고 분쟁이 해결되지 않을 경우, 양 당사자는 민사소송법상의 관할법원에 소송을 제기할 수 있습니다.</p>
            <p className="mt-2">③ 본 약관은 대한민국 법률에 따라 규율되고 해석됩니다.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">부칙</h2>
            <p><strong>시행일자: 2025년 1월 27일</strong></p>
          </section>
        </div>
      </div>
    </div>
  );
}

// 회사소개 페이지
function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">취준생 도우미</h1>
          <p className="text-xl text-gray-600">취업 준비생을 위한 종합 지원 플랫폼</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="text-rose-500" fill="currentColor" />
              우리의 미션
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              취준생 도우미는 취업을 준비하는 모든 분들이 보다 효율적이고 체계적으로 준비할 수 있도록 돕기 위해 만들어졌습니다. 
              복잡하고 힘든 취업 준비 과정에서 작은 도움이라도 되고자 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-yellow-500" />
              제공 서비스
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-blue-600" size={24} />
                  <h3 className="font-bold text-gray-800">자소서 일정 관리</h3>
                </div>
                <p className="text-gray-700 text-sm">여러 기업의 자소서 작성 일정을 한눈에 관리하세요</p>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Type className="text-indigo-600" size={24} />
                  <h3 className="font-bold text-gray-800">글자수 세기</h3>
                </div>
                <p className="text-gray-700 text-sm">공백 포함/제외, 단어수까지 정확하게 확인</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-purple-600" size={24} />
                  <h3 className="font-bold text-gray-800">오늘의 운세</h3>
                </div>
                <p className="text-gray-700 text-sm">하루를 긍정적으로 시작하는 작은 응원</p>
              </div>

              <div className="bg-rose-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="text-rose-600" size={24} fill="currentColor" />
                  <h3 className="font-bold text-gray-800">1일 1친절</h3>
                </div>
                <p className="text-gray-700 text-sm">작은 친절로 세상에 행운을 전하세요</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">우리의 약속</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>항상 무료로 제공되는 서비스</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>개인정보를 수집하지 않는 안전한 서비스</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>사용자 경험을 최우선으로 하는 서비스 개선</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>취업 준비생들을 위한 지속적인 응원과 지원</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">연락처</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm mb-1">이메일</p>
                  <p className="text-gray-800 font-medium">contact@job-helper.com</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">운영 시간</p>
                  <p className="text-gray-800">평일 10:00 - 18:00 (주말 및 공휴일 제외)</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">문의 사항</p>
                  <p className="text-gray-800">서비스 개선 제안, 버그 제보, 협업 문의 등 언제든 연락주세요!</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center pt-8 border-t border-gray-200">
            <div className="mb-6">
              <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto">
                <g className="animate-pulse">
                  <line x1="100" y1="80" x2="100" y2="20" stroke="#FFD700" strokeWidth="3" opacity="0.8" />
                  <circle cx="100" cy="15" r="8" fill="#FFD700" opacity="0.9" />
                </g>
                <circle cx="100" cy="100" r="40" fill="#FF9966" />
                <polygon points="70,75 65,55 85,70" fill="#FF9966" />
                <polygon points="130,75 135,55 115,70" fill="#FF9966" />
                <path d="M 85 95 Q 90 100 95 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 105 95 Q 110 100 115 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
                <polygon points="100,105 95,110 105,110" fill="#FF6B6B" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">잘 될 거예요</h3>
            <p className="text-xl text-gray-600">여러분의 취업을 진심으로 응원합니다! 💪</p>
          </section>
        </div>
      </div>
    </div>
  );
}
function ScheduleManager() {
  const [schedules, setSchedules] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    startDate: '',
    endDate: '',
    memo: ''
  });

  const handleAddSchedule = () => {
    if (!formData.company || !formData.startDate || !formData.endDate) {
      alert('기업명과 시작일, 마감일을 입력해주세요!');
      return;
    }

    setSchedules([...schedules, { id: Date.now(), ...formData }]);
    setFormData({ company: '', startDate: '', endDate: '', memo: '' });
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">자소서 일정 관리</h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + 일정 추가
          </button>
        </div>

        <div className="space-y-3">
          {schedules.length === 0 ? (
            <p className="text-gray-500 text-center py-12">등록된 일정이 없습니다.</p>
          ) : (
            schedules.map(schedule => (
              <div key={schedule.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-all">
                <h4 className="font-bold text-gray-800 text-lg">{schedule.company}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {schedule.startDate} ~ {schedule.endDate}
                </p>
                {schedule.memo && <p className="text-sm text-gray-500 mt-2">{schedule.memo}</p>}
              </div>
            ))
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">일정 추가</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">기업명</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">작성 시작일</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">마감일</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">메모 (선택)</label>
                <textarea
                  value={formData.memo}
                  onChange={(e) => setFormData({...formData, memo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                />
              </div>

              <button
                onClick={handleAddSchedule}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 홈 페이지 컴포넌트
function HomePage() {
  return (
    <div className="max-w-3xl mx-auto flex items-center justify-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <div className="w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* 행운빔 고양이 */}
          <div className="mb-8">
            <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
              {/* 행운빔 */}
              <g className="animate-pulse">
                <line x1="100" y1="80" x2="100" y2="20" stroke="#FFD700" strokeWidth="3" opacity="0.8" />
                <line x1="90" y1="80" x2="80" y2="20" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
                <line x1="110" y1="80" x2="120" y2="20" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
                <circle cx="100" cy="15" r="8" fill="#FFD700" opacity="0.9" />
                <circle cx="80" cy="15" r="5" fill="#FFA500" opacity="0.7" />
                <circle cx="120" cy="15" r="5" fill="#FFA500" opacity="0.7" />
                
                {/* 반짝임 */}
                <circle cx="70" cy="40" r="3" fill="#FFFF00" opacity="0.8" />
                <circle cx="130" cy="35" r="3" fill="#FFFF00" opacity="0.8" />
                <circle cx="95" cy="50" r="2" fill="#FFD700" opacity="0.9" />
                <circle cx="105" cy="45" r="2" fill="#FFD700" opacity="0.9" />
              </g>
              
              {/* 고양이 머리 */}
              <circle cx="100" cy="100" r="40" fill="#FF9966" />
              
              {/* 왼쪽 귀 */}
              <polygon points="70,75 65,55 85,70" fill="#FF9966" />
              <polygon points="72,72 70,60 80,70" fill="#FFB399" />
              
              {/* 오른쪽 귀 */}
              <polygon points="130,75 135,55 115,70" fill="#FF9966" />
              <polygon points="128,72 130,60 120,70" fill="#FFB399" />
              
              {/* 눈 (감은 눈) */}
              <path d="M 85 95 Q 90 100 95 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 105 95 Q 110 100 115 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
              
              {/* 코 */}
              <polygon points="100,105 95,110 105,110" fill="#FF6B6B" />
              
              {/* 입 */}
              <path d="M 100 110 Q 90 115 85 110" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 100 110 Q 110 115 115 110" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
              
              {/* 수염 */}
              <line x1="60" y1="100" x2="80" y2="98" stroke="#333" strokeWidth="1.5" />
              <line x1="60" y1="105" x2="80" y2="105" stroke="#333" strokeWidth="1.5" />
              <line x1="120" y1="98" x2="140" y2="100" stroke="#333" strokeWidth="1.5" />
              <line x1="120" y1="105" x2="140" y2="105" stroke="#333" strokeWidth="1.5" />
              
              {/* 몸통 */}
              <ellipse cx="100" cy="150" rx="35" ry="30" fill="#FF9966" />
              
              {/* 발 */}
              <ellipse cx="85" cy="175" rx="8" ry="12" fill="#FF9966" />
              <ellipse cx="115" cy="175" rx="8" ry="12" fill="#FF9966" />
              
              {/* 꼬리 */}
              <path d="M 130 160 Q 145 165 150 150 Q 155 135 145 125" stroke="#FF9966" strokeWidth="10" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* 메시지 */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              잘 될 거예요
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              잘 될까요?
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800">
              잘 되야겠죠
            </h3>
            
            <p className="mt-8 text-gray-500 text-lg">
              취업 준비, 함께 응원합니다 💪
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 메인 홈페이지
export default function JobHelperHomepage() {
  const [activeTab, setActiveTab] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const tabs = [
    { id: 'home', name: '홈', icon: Heart },
    { id: 'schedule', name: '일정관리', icon: Calendar },
    { id: 'counter', name: '글자수세기', icon: Type },
    { id: 'fortune', name: '오늘의운세', icon: Sparkles },
    { id: 'kindness', name: '1일1친절', icon: Heart }
  ];

  const footerLinks = [
    { id: 'privacy', name: '개인정보처리방침' },
    { id: 'terms', name: '이용약관' },
    { id: 'about', name: '회사소개' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 헤더 */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              취준생 도우미
            </h1>
            
            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden md:flex gap-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 모바일 네비게이션 */}
          {showMobileMenu && (
            <nav className="md:hidden mt-4 space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schedule' && <ScheduleManager />}
        {activeTab === 'counter' && <CharacterCounter />}
        {activeTab === 'fortune' && <FortuneTeller />}
        {activeTab === 'kindness' && <DailyKindness />}
        {activeTab === 'privacy' && <PrivacyPolicy />}
        {activeTab === 'terms' && <TermsOfService />}
        {activeTab === 'about' && <AboutUs />}
      </main>

      {/* 푸터 */}
      <footer className="bg-white mt-12 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">취업 준비, 화이팅! 💪</p>
            <div className="flex gap-6">
              {footerLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className="text-gray-600 hover:text-gray-800 text-sm transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            © 2025 취준생 도우미. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
