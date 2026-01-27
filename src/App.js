{\rtf1\ansi\ansicpg949\cocoartf2758
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import React, \{ useState \} from 'react';\
import \{ Calendar, Type, Sparkles, Heart, Menu, X \} from 'lucide-react';\
\
// \uc0\u44544 \u51088 \u49688  \u49464 \u44592  \u52980 \u54252 \u45324 \u53944 \
function CharacterCounter() \{\
  const [text, setText] = useState('');\
  const [limit, setLimit] = useState(1000);\
\
  const charCount = text.length;\
  const charCountNoSpace = text.replace(/\\s/g, '').length;\
  const wordCount = text.trim() ? text.trim().split(/\\s+/).length : 0;\
  const percentage = (charCount / limit) * 100;\
\
  return (\
    <div className="max-w-4xl mx-auto">\
      <div className="bg-white rounded-2xl shadow-xl p-8">\
        <div className="flex items-center gap-3 mb-6">\
          <Type className="text-indigo-600" size=\{32\} />\
          <h2 className="text-3xl font-bold text-gray-800">\uc0\u44544 \u51088 \u49688  \u49464 \u44592 </h2>\
        </div>\
\
        <div className="mb-4">\
          <label className="block text-gray-700 font-medium mb-2">\uc0\u44544 \u51088  \u51228 \u54620  \u49444 \u51221 </label>\
          <input\
            type="number"\
            value=\{limit\}\
            onChange=\{(e) => setLimit(parseInt(e.target.value) || 1000)\}\
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"\
            placeholder="1000"\
          />\
        </div>\
\
        <textarea\
          value=\{text\}\
          onChange=\{(e) => setText(e.target.value)\}\
          className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"\
          placeholder="\uc0\u50668 \u44592 \u50640  \u53581 \u49828 \u53944 \u47484  \u51077 \u47141 \u54616 \u49464 \u50836 ..."\
        />\
\
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">\
          <div className="bg-indigo-50 rounded-lg p-4 text-center">\
            <p className="text-sm text-gray-600 mb-1">\uc0\u44277 \u48177  \u54252 \u54632 </p>\
            <p className="text-2xl font-bold text-indigo-600">\{charCount\}</p>\
          </div>\
          <div className="bg-purple-50 rounded-lg p-4 text-center">\
            <p className="text-sm text-gray-600 mb-1">\uc0\u44277 \u48177  \u51228 \u50808 </p>\
            <p className="text-2xl font-bold text-purple-600">\{charCountNoSpace\}</p>\
          </div>\
          <div className="bg-blue-50 rounded-lg p-4 text-center">\
            <p className="text-sm text-gray-600 mb-1">\uc0\u45800 \u50612  \u49688 </p>\
            <p className="text-2xl font-bold text-blue-600">\{wordCount\}</p>\
          </div>\
          <div className="bg-pink-50 rounded-lg p-4 text-center">\
            <p className="text-sm text-gray-600 mb-1">\uc0\u51652 \u54665 \u47456 </p>\
            <p className="text-2xl font-bold text-pink-600">\{percentage.toFixed(1)\}%</p>\
          </div>\
        </div>\
\
        <div className="mt-4">\
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">\
            <div\
              className=\{`h-full transition-all duration-300 $\{\
                percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'\
              \}`\}\
              style=\{\{ width: `$\{Math.min(percentage, 100)\}%` \}\}\
            />\
          </div>\
          <p className="text-sm text-gray-600 mt-2 text-center">\
            \{charCount\} / \{limit\} \uc0\u44544 \u51088  \{percentage > 100 && <span className="text-red-600 font-bold">(\u51228 \u54620  \u52488 \u44284 !)</span>\}\
          </p>\
        </div>\
      </div>\
    </div>\
  );\
\}\
\
// \uc0\u50724 \u45720 \u51032  \u50868 \u49464  \u52980 \u54252 \u45324 \u53944  (\u44036 \u49548 \u54868  \u48260 \u51204 )\
function FortuneTeller() \{\
  const [formData, setFormData] = useState(\{\
    name: '',\
    birthDate: '',\
    gender: '',\
    city: ''\
  \});\
  const [fortune, setFortune] = useState(null);\
  const [loading, setLoading] = useState(false);\
\
  const generateFortune = () => \{\
    if (!formData.name || !formData.birthDate || !formData.gender || !formData.city) \{\
      alert('\uc0\u47784 \u46304  \u51221 \u48372 \u47484  \u51077 \u47141 \u54644 \u51452 \u49464 \u50836 !');\
      return;\
    \}\
\
    setLoading(true);\
\
    const hash = (str) => \{\
      let h = 0;\
      for (let i = 0; i < str.length; i++) \{\
        h = ((h << 5) - h) + str.charCodeAt(i);\
        h = h & h;\
      \}\
      return Math.abs(h);\
    \};\
\
    const seed = hash(formData.name + formData.birthDate + formData.gender + formData.city + new Date().toDateString());\
    const rng = (max) => (seed % max) + 1;\
\
    const fortunes = \{\
      overall: [\
        "\uc0\u50724 \u45720 \u51008  \u44557 \u51221 \u51201 \u51064  \u50640 \u45320 \u51648 \u44032  \u45336 \u52824 \u45716  \u45216 \u51077 \u45768 \u45796 . \u49352 \u47196 \u50868  \u49884 \u51089 \u51012  \u50948 \u54620  \u51339 \u51008  \u44592 \u54924 \u44032  \u52286 \u50500 \u50732  \u49688  \u51080 \u51004 \u45768  \u51452 \u48320 \u51012  \u51096  \u49332 \u54196 \u48372 \u49464 \u50836 .",\
        "\uc0\u52264 \u48516 \u54616 \u44172  \u54616 \u47336 \u47484  \u49884 \u51089 \u54616 \u47732  \u50696 \u49345 \u52824  \u47803 \u54620  \u54665 \u50868 \u51060  \u52286 \u50500 \u50732  \u44163 \u51077 \u45768 \u45796 . \u51089 \u51008  \u51068 \u50640 \u46020  \u44048 \u49324 \u54616 \u45716  \u47560 \u51020 \u51012  \u44032 \u51648 \u49464 \u50836 .",\
        "\uc0\u54876 \u47141 \u51060  \u45336 \u52824 \u45716  \u54616 \u47336 \u44032  \u46112  \u44163 \u51077 \u45768 \u45796 . \u50724 \u47019 \u46041 \u50504  \u48120 \u47364 \u50772 \u45912  \u51068 \u51012  \u49884 \u51089 \u54616 \u44592 \u50640  \u51339 \u51008  \u45216 \u51077 \u45768 \u45796 ."\
      ],\
      love: ["\uc0\u49548 \u51473 \u54620  \u49324 \u46988 \u50640 \u44172  \u47560 \u51020 \u51012  \u54364 \u54788 \u54616 \u44592  \u51339 \u51008  \u45216 \u51077 \u45768 \u45796 .", "\u51452 \u48320  \u49324 \u46988 \u46308 \u44284 \u51032  \u44288 \u44228 \u44032  \u45908 \u50865  \u46024 \u46021 \u54644 \u51656  \u49688  \u51080 \u49845 \u45768 \u45796 ."],\
      career: ["\uc0\u50629 \u47924 \u50640 \u49436  \u51339 \u51008  \u49457 \u44284 \u47484  \u45244  \u49688  \u51080 \u45716  \u45216 \u51077 \u45768 \u45796 .", "\u46041 \u47308 \u46308 \u44284 \u51032  \u54801 \u47141 \u51060  \u48731 \u51012  \u48156 \u54624  \u44163 \u51077 \u45768 \u45796 ."],\
      money: ["\uc0\u51089 \u51008  \u54665 \u50868 \u51060  \u52286 \u50500 \u50732  \u49688  \u51080 \u49845 \u45768 \u45796 .", "\u44228 \u54925 \u51201 \u51064  \u49548 \u48708 \u44032  \u51473 \u50836 \u54633 \u45768 \u45796 ."],\
      health: ["\uc0\u52649 \u48516 \u54620  \u55092 \u49885 \u51012  \u52712 \u54616 \u49464 \u50836 .", "\u44032 \u48316 \u50868  \u50868 \u46041 \u51060  \u54876 \u47141 \u51012  \u44032 \u51256 \u45796 \u51460  \u44163 \u51077 \u45768 \u45796 ."]\
    \};\
\
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];\
\
    setTimeout(() => \{\
      setFortune(\{\
        overall: fortunes.overall[seed % fortunes.overall.length],\
        love: fortunes.love[seed % fortunes.love.length],\
        career: fortunes.career[(seed * 2) % fortunes.career.length],\
        money: fortunes.money[(seed * 3) % fortunes.money.length],\
        health: fortunes.health[(seed * 4) % fortunes.health.length],\
        luckyNumber: rng(99),\
        luckyColor: colors[seed % colors.length]\
      \});\
      setLoading(false);\
    \}, 1000);\
  \};\
\
  return (\
    <div className="max-w-2xl mx-auto">\
      <div className="bg-white rounded-2xl shadow-xl p-8">\
        \{!fortune ? (\
          <div className="space-y-6">\
            <div className="flex items-center gap-3 mb-6">\
              <Sparkles className="text-purple-600" size=\{32\} />\
              <h2 className="text-3xl font-bold text-gray-800">\uc0\u50724 \u45720 \u51032  \u50868 \u49464 </h2>\
            </div>\
\
            <div>\
              <label className="block text-gray-700 mb-2 font-medium">\uc0\u51060 \u47492 </label>\
              <input\
                type="text"\
                value=\{formData.name\}\
                onChange=\{(e) => setFormData(\{...formData, name: e.target.value\})\}\
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"\
                placeholder="\uc0\u54861 \u44600 \u46041 "\
              />\
            </div>\
\
            <div>\
              <label className="block text-gray-700 mb-2 font-medium">\uc0\u49373 \u45380 \u50900 \u51068 </label>\
              <input\
                type="date"\
                value=\{formData.birthDate\}\
                onChange=\{(e) => setFormData(\{...formData, birthDate: e.target.value\})\}\
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"\
              />\
            </div>\
\
            <div>\
              <label className="block text-gray-700 mb-2 font-medium">\uc0\u49457 \u48324 </label>\
              <div className="flex gap-4">\
                <button\
                  onClick=\{() => setFormData(\{...formData, gender: '\uc0\u45224 \u49457 '\})\}\
                  className=\{`flex-1 py-3 rounded-lg font-medium transition-all $\{\
                    formData.gender === '\uc0\u45224 \u49457 '\
                      ? 'bg-blue-500 text-white shadow-lg'\
                      : 'bg-gray-100 text-gray-700 border border-gray-300'\
                  \}`\}\
                >\
                  \uc0\u45224 \u49457 \
                </button>\
                <button\
                  onClick=\{() => setFormData(\{...formData, gender: '\uc0\u50668 \u49457 '\})\}\
                  className=\{`flex-1 py-3 rounded-lg font-medium transition-all $\{\
                    formData.gender === '\uc0\u50668 \u49457 '\
                      ? 'bg-pink-500 text-white shadow-lg'\
                      : 'bg-gray-100 text-gray-700 border border-gray-300'\
                  \}`\}\
                >\
                  \uc0\u50668 \u49457 \
                </button>\
              </div>\
            </div>\
\
            <div>\
              <label className="block text-gray-700 mb-2 font-medium">\uc0\u53468 \u50612 \u45212  \u46020 \u49884 </label>\
              <input\
                type="text"\
                value=\{formData.city\}\
                onChange=\{(e) => setFormData(\{...formData, city: e.target.value\})\}\
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"\
                placeholder="\uc0\u49436 \u50872 "\
              />\
            </div>\
\
            <button\
              onClick=\{generateFortune\}\
              disabled=\{loading\}\
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50"\
            >\
              \{loading ? '\uc0\u50868 \u49464  \u54869 \u51064  \u51473 ...' : '\u50724 \u45720 \u51032  \u50868 \u49464  \u48372 \u44592 '\}\
            </button>\
          </div>\
        ) : (\
          <div className="space-y-6">\
            <div className="text-center pb-4 border-b border-gray-200">\
              <h2 className="text-2xl font-bold text-gray-800 mb-2">\{formData.name\}\uc0\u45784 \u51032  \u50724 \u45720 </h2>\
            </div>\
\
            <div className="bg-purple-50 rounded-xl p-6">\
              <h3 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51333 \u54633 \u50868 </h3>\
              <p className="text-gray-700 leading-relaxed">\{fortune.overall\}</p>\
            </div>\
\
            <div className="grid grid-cols-2 gap-4">\
              <div className="bg-pink-50 rounded-xl p-4">\
                <h3 className="font-bold text-gray-800 mb-2">\uc0\u50528 \u51221 \u50868 </h3>\
                <p className="text-sm text-gray-700">\{fortune.love\}</p>\
              </div>\
              <div className="bg-blue-50 rounded-xl p-4">\
                <h3 className="font-bold text-gray-800 mb-2">\uc0\u51649 \u50629 \u50868 </h3>\
                <p className="text-sm text-gray-700">\{fortune.career\}</p>\
              </div>\
              <div className="bg-green-50 rounded-xl p-4">\
                <h3 className="font-bold text-gray-800 mb-2">\uc0\u44552 \u51204 \u50868 </h3>\
                <p className="text-sm text-gray-700">\{fortune.money\}</p>\
              </div>\
              <div className="bg-yellow-50 rounded-xl p-4">\
                <h3 className="font-bold text-gray-800 mb-2">\uc0\u44148 \u44053 \u50868 </h3>\
                <p className="text-sm text-gray-700">\{fortune.health\}</p>\
              </div>\
            </div>\
\
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4">\
              <div className="flex justify-between items-center">\
                <div>\
                  <p className="text-sm text-gray-600">\uc0\u54665 \u50868 \u51032  \u49707 \u51088 </p>\
                  <p className="text-2xl font-bold text-gray-800">\{fortune.luckyNumber\}</p>\
                </div>\
                <div>\
                  <p className="text-sm text-gray-600">\uc0\u54665 \u50868 \u51032  \u49353 \u49345 </p>\
                  <div className="flex items-center gap-2">\
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow" style=\{\{backgroundColor: fortune.luckyColor\}\}></div>\
                  </div>\
                </div>\
              </div>\
            </div>\
\
            <button\
              onClick=\{() => setFortune(null)\}\
              className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all"\
            >\
              \uc0\u45796 \u49884  \u48372 \u44592 \
            </button>\
          </div>\
        )\}\
      </div>\
    </div>\
  );\
\}\
\
// 1\uc0\u51068  1\u52828 \u51208  \u52980 \u54252 \u45324 \u53944  (\u44036 \u49548 \u54868  \u48260 \u51204 )\
function DailyKindness() \{\
  const [kindness, setKindness] = useState(null);\
  const [showLuckyBeam, setShowLuckyBeam] = useState(false);\
\
  const kindnessActions = [\
    "\uc0\u50648 \u47532 \u48288 \u51060 \u53552  \u47928 \u51012  \u51105 \u50500 \u51452 \u49464 \u50836 ",\
    "\uc0\u51648 \u45208 \u44032 \u45716  \u49324 \u46988 \u50640 \u44172  \u48120 \u49548  \u51648 \u50612 \u51452 \u49464 \u50836 ",\
    "\uc0\u46041 \u47308 \u50640 \u44172  \u52964 \u54588  \u54620  \u51092  \u49324 \u51452 \u49464 \u50836 ",\
    "\uc0\u44032 \u51313 \u50640 \u44172  \u44048 \u49324  \u47700 \u49884 \u51648 \u47484  \u48372 \u45236 \u49464 \u50836 ",\
    "\uc0\u54200 \u51032 \u51216  \u51649 \u50896 \u50640 \u44172  '\u44048 \u49324 \u54633 \u45768 \u45796 ' \u54620  \u47560 \u46356  \u44148 \u45348 \u49464 \u50836 ",\
    "\uc0\u45572 \u44400 \u44032 \u51032  \u51060 \u50556 \u44592 \u47484  \u51652 \u49900 \u51004 \u47196  \u46308 \u50612 \u51452 \u49464 \u50836 ",\
    "\uc0\u48512 \u47784 \u45784 \u44760  \u51204 \u54868 \u46300 \u47532 \u49464 \u50836 ",\
    "\uc0\u45572 \u44400 \u44032 \u47484  \u51652 \u49900 \u51004 \u47196  \u52845 \u52268 \u54644 \u51452 \u49464 \u50836 "\
  ];\
\
  const getTodayKindness = () => \{\
    const today = new Date().toDateString();\
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);\
    const index = hash % kindnessActions.length;\
    setKindness(kindnessActions[index]);\
  \};\
\
  return (\
    <div className="max-w-2xl mx-auto">\
      <div className="bg-white rounded-2xl shadow-xl p-8">\
        \{!kindness ? (\
          <div className="text-center py-12">\
            <Heart className="mx-auto mb-6 text-rose-500" size=\{64\} fill="currentColor" />\
            <h2 className="text-3xl font-bold text-gray-800 mb-4">1\uc0\u51068  1\u52828 \u51208 </h2>\
            <p className="text-gray-600 mb-8 leading-relaxed">\
              \uc0\u50724 \u45720  \u49892 \u52380 \u54624  \u51089 \u51008  \u52828 \u51208 \u51012  \u54869 \u51064 \u54616 \u49464 \u50836 \
            </p>\
            <button\
              onClick=\{getTodayKindness\}\
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"\
            >\
              \uc0\u50724 \u45720 \u51032  \u52828 \u51208  \u48155 \u44592 \
            </button>\
          </div>\
        ) : (\
          <div className="text-center py-12">\
            <div className="mb-6">\
              <div className="inline-block p-4 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full">\
                <Heart className="text-rose-500" size=\{48\} fill="currentColor" />\
              </div>\
            </div>\
            \
            <h3 className="text-gray-500 font-medium mb-3">\uc0\u50724 \u45720 \u51032  \u52828 \u51208 </h3>\
            <p className="text-3xl font-bold text-gray-800 mb-8 leading-relaxed">\
              \{kindness\}\
            </p>\
            \
            <button\
              onClick=\{() => setShowLuckyBeam(true)\}\
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"\
            >\
              \uc0\u50612 \u51228 \u45716  \u52828 \u51208 \u51012  \u54665 \u54616 \u49512 \u45208 \u50836 ?\
            </button>\
          </div>\
        )\}\
\
        <div className="mt-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl p-6 text-white text-center">\
          <p className="leading-relaxed">\
            \uc0\u46024 \u51012  \u50619 \u44256  \u49910 \u51004 \u47732  \u46024 \u51012  \u54400 \u44256 , \u49324 \u46993 \u51012  \u50619 \u44256  \u49910 \u51004 \u47732  \u49324 \u46993 \u54616 \u45716  \u48277 \u51012  \u48176 \u50892 \u50556  \u54633 \u45768 \u45796 .<br />\
            \uc0\u54665 \u50868 \u51012  \u50948 \u54644 \u49436 \u45716  \u53440 \u51064 \u50640 \u44172  \u54665 \u50868 \u51012  \u51204 \u54644 \u50556 \u44192 \u51424 .\
          </p>\
        </div>\
      </div>\
\
      \{showLuckyBeam && (\
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick=\{() => setShowLuckyBeam(false)\}>\
          <div className="bg-white rounded-3xl p-8 max-w-md" onClick=\{(e) => e.stopPropagation()\}>\
            <h3 className="text-2xl font-bold text-center mb-6">\uc0\u54665 \u50868 \u48724  \u48156 \u49324 ! \u10024 </h3>\
            <div className="text-6xl text-center mb-6">\uc0\u55357 \u56369 \u9889 </div>\
            <p className="text-lg text-center text-gray-700 mb-6">\
              \uc0\u45817 \u49888 \u51032  \u52828 \u51208 \u51060  \u49464 \u49345 \u50640  \u54665 \u50868 \u51012  \u44032 \u51256 \u45796 \u51469 \u45768 \u45796 ! \u55356 \u57152 \
            </p>\
            <button\
              onClick=\{() => setShowLuckyBeam(false)\}\
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold rounded-full"\
            >\
              \uc0\u44048 \u49324 \u54633 \u45768 \u45796  \u55357 \u56477 \
            </button>\
          </div>\
        </div>\
      )\}\
    </div>\
  );\
\}\
\
// \uc0\u44060 \u51064 \u51221 \u48372 \u52376 \u47532 \u48169 \u52840  \u54168 \u51060 \u51648 \
function PrivacyPolicy() \{\
  return (\
    <div className="max-w-4xl mx-auto">\
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">\
        <h1 className="text-3xl font-bold text-gray-800 mb-8">\uc0\u44060 \u51064 \u51221 \u48372 \u52376 \u47532 \u48169 \u52840 </h1>\
        \
        <div className="space-y-6 text-gray-700 leading-relaxed">\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. \uc0\u44060 \u51064 \u51221 \u48372 \u51032  \u49688 \u51665  \u48143  \u51060 \u50857  \u47785 \u51201 </h2>\
            <p>\uc0\u52712 \u51456 \u49373  \u46020 \u50864 \u48120 (\u51060 \u54616  "\u54924 \u49324 ")\u45716  \u45796 \u51020 \u51032  \u47785 \u51201 \u51012  \u50948 \u54616 \u50668  \u44060 \u51064 \u51221 \u48372 \u47484  \u52376 \u47532 \u54633 \u45768 \u45796 . \u52376 \u47532 \u54616 \u44256  \u51080 \u45716  \u44060 \u51064 \u51221 \u48372 \u45716  \u45796 \u51020 \u51032  \u47785 \u51201  \u51060 \u50808 \u51032  \u50857 \u46020 \u47196 \u45716  \u51060 \u50857 \u46104 \u51648  \u50506 \u51004 \u47728 , \u51060 \u50857  \u47785 \u51201 \u51060  \u48320 \u44221 \u46104 \u45716  \u44221 \u50864 \u50640 \u45716  \u48324 \u46020 \u51032  \u46041 \u51032 \u47484  \u48155 \u45716  \u46321  \u54596 \u50836 \u54620  \u51312 \u52824 \u47484  \u51060 \u54665 \u54624  \u50696 \u51221 \u51077 \u45768 \u45796 .</p>\
            <ul className="list-disc list-inside mt-2 ml-4">\
              <li>\uc0\u49436 \u48708 \u49828  \u51228 \u44277  \u48143  \u50868 \u50689 </li>\
              <li>\uc0\u50937 \u49324 \u51060 \u53944  \u51060 \u50857  \u53685 \u44228  \u48516 \u49437 </li>\
              <li>\uc0\u49324 \u50857 \u51088  \u47928 \u51032  \u51025 \u45824 </li>\
            </ul>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. \uc0\u49688 \u51665 \u54616 \u45716  \u44060 \u51064 \u51221 \u48372 \u51032  \u54637 \u47785 </h2>\
            <p>\uc0\u54924 \u49324 \u45716  \u44592 \u48376 \u51201 \u51004 \u47196  \u48324 \u46020 \u51032  \u54924 \u50896 \u44032 \u51077  \u50630 \u51060  \u49436 \u48708 \u49828 \u47484  \u51228 \u44277 \u54616 \u44256  \u51080 \u51004 \u47728 , \u45796 \u51020 \u44284  \u44057 \u51008  \u51221 \u48372 \u44032  \u51088 \u46041 \u51004 \u47196  \u49688 \u51665 \u46112  \u49688  \u51080 \u49845 \u45768 \u45796 .</p>\
            <ul className="list-disc list-inside mt-2 ml-4">\
              <li>\uc0\u53216 \u53412 (Cookie) \u48143  \u51217 \u49549  IP \u51221 \u48372 </li>\
              <li>\uc0\u48169 \u47928  \u51068 \u49884 , \u49436 \u48708 \u49828  \u51060 \u50857  \u44592 \u47197 </li>\
              <li>\uc0\u44592 \u44592  \u51221 \u48372  (\u48652 \u46972 \u50864 \u51200  \u51333 \u47448 , OS \u46321 )</li>\
            </ul>\
            <p className="mt-2">\uc0\u8251  \u54924 \u49324 \u45716  \u49324 \u50857 \u51088 \u51032  \u51060 \u47492 , \u51060 \u47700 \u51068 , \u51204 \u54868 \u48264 \u54840  \u46321  \u44060 \u51064  \u49885 \u48324  \u51221 \u48372 \u47484  \u51649 \u51217  \u49688 \u51665 \u54616 \u51648  \u50506 \u49845 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. \uc0\u44060 \u51064 \u51221 \u48372 \u51032  \u48372 \u50976  \u48143  \u51060 \u50857  \u44592 \u44036 </h2>\
            <p>\uc0\u54924 \u49324 \u45716  \u48277 \u47161 \u50640  \u46384 \u47480  \u44060 \u51064 \u51221 \u48372  \u48372 \u50976 \'b7\u51060 \u50857 \u44592 \u44036  \u46608 \u45716  \u51221 \u48372 \u51452 \u52404 \u47196 \u48512 \u53552  \u44060 \u51064 \u51221 \u48372 \u47484  \u49688 \u51665  \u49884 \u50640  \u46041 \u51032 \u48155 \u51008  \u44060 \u51064 \u51221 \u48372  \u48372 \u50976 \'b7\u51060 \u50857 \u44592 \u44036  \u45236 \u50640 \u49436  \u44060 \u51064 \u51221 \u48372 \u47484  \u52376 \u47532 \'b7\u48372 \u50976 \u54633 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u51088 \u46041  \u49688 \u51665 \u46104 \u45716  \u51221 \u48372 \u45716  \u49436 \u48708 \u49828  \u51228 \u44277  \u47785 \u51201  \u45804 \u49457  \u49884 \u44620 \u51648  \u48372 \u50976 \u54616 \u47728 , \u53685 \u44228  \u48516 \u49437  \u47785 \u51201 \u51032  \u45936 \u51060 \u53552 \u45716  \u51061 \u47749 \u54868 \u54616 \u50668  \u48372 \u44288 \u54633 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. \uc0\u53216 \u53412 (Cookie)\u51032  \u50868 \u50857 </h2>\
            <p>\uc0\u54924 \u49324 \u45716  \u49324 \u50857 \u51088 \u50640 \u44172  \u44060 \u48324 \u51201 \u51064  \u47582 \u52644 \u49436 \u48708 \u49828 \u47484  \u51228 \u44277 \u54616 \u44592  \u50948 \u54644  \u51060 \u50857 \u51221 \u48372 \u47484  \u51200 \u51109 \u54616 \u44256  \u49688 \u49884 \u47196  \u48520 \u47084 \u50724 \u45716  '\u53216 \u53412 (cookie)'\u47484  \u49324 \u50857 \u54633 \u45768 \u45796 .</p>\
            <ul className="list-disc list-inside mt-2 ml-4">\
              <li>\uc0\u53216 \u53412 \u45716  \u50937 \u49324 \u51060 \u53944 \u47484  \u50868 \u50689 \u54616 \u45716 \u45936  \u51060 \u50857 \u46104 \u45716  \u49436 \u48260 \u44032  \u49324 \u50857 \u51088 \u51032  \u52980 \u54504 \u53552  \u48652 \u46972 \u50864 \u51200 \u50640 \u44172  \u48372 \u45236 \u45716  \u49548 \u47049 \u51032  \u51221 \u48372 \u51077 \u45768 \u45796 .</li>\
              <li>\uc0\u49324 \u50857 \u51088 \u45716  \u53216 \u53412  \u49444 \u52824 \u50640  \u45824 \u54620  \u49440 \u53469 \u44428 \u51012  \u44032 \u51648 \u44256  \u51080 \u51004 \u47728 , \u50937 \u48652 \u46972 \u50864 \u51200 \u50640 \u49436  \u50741 \u49496 \u51012  \u49444 \u51221 \u54632 \u51004 \u47196 \u50024  \u53216 \u53412 \u47484  \u44144 \u48512 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 .</li>\
              <li>\uc0\u45800 , \u53216 \u53412 \u51032  \u51200 \u51109 \u51012  \u44144 \u48512 \u54624  \u44221 \u50864  \u51068 \u48512  \u49436 \u48708 \u49828  \u51060 \u50857 \u50640  \u50612 \u47140 \u50880 \u51060  \u51080 \u51012  \u49688  \u51080 \u49845 \u45768 \u45796 .</li>\
            </ul>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. \uc0\u44305 \u44256  \u49436 \u48708 \u49828 </h2>\
            <p>\uc0\u48376  \u50937 \u49324 \u51060 \u53944 \u45716  Google \u50528 \u46300 \u49468 \u49828 (AdSense) \u44305 \u44256 \u47484  \u44172 \u51116 \u54616 \u44256  \u51080 \u51004 \u47728 , Google\u51008  \u44305 \u44256  \u44172 \u51116 \u47484  \u50948 \u54644  \u53216 \u53412 \u47484  \u49324 \u50857 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 .</p>\
            <p className="mt-2">Google\uc0\u51032  \u44305 \u44256  \u48143  \u53080 \u53584 \u52768  \u44060 \u51064  \u52572 \u51201 \u54868 , \u44305 \u44256  \u54952 \u44284  \u52769 \u51221 , \u51104 \u51116 \u44256 \u44061  \u53685 \u44228 \u50640  \u53216 \u53412 \u44032  \u49324 \u50857 \u46121 \u45768 \u45796 . \u49324 \u50857 \u51088 \u45716  <a href="https://www.google.com/settings/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google \u44305 \u44256  \u49444 \u51221 </a>\u50640 \u49436  \u44060 \u51064  \u52572 \u51201 \u54868  \u44305 \u44256 \u47484  \u49440 \u53469  \u54644 \u51228 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. \uc0\u44060 \u51064 \u51221 \u48372  \u48372 \u54840 \u52293 \u51076 \u51088 </h2>\
            <p>\uc0\u54924 \u49324 \u45716  \u44060 \u51064 \u51221 \u48372  \u52376 \u47532 \u50640  \u44288 \u54620  \u50629 \u47924 \u47484  \u52509 \u44292 \u54644 \u49436  \u52293 \u51076 \u51648 \u44256 , \u44060 \u51064 \u51221 \u48372  \u52376 \u47532 \u50752  \u44288 \u47144 \u54620  \u51221 \u48372 \u51452 \u52404 \u51032  \u48520 \u47564 \u52376 \u47532  \u48143  \u54588 \u54644 \u44396 \u51228  \u46321 \u51012  \u50948 \u54616 \u50668  \u50500 \u47000 \u50752  \u44057 \u51060  \u44060 \u51064 \u51221 \u48372  \u48372 \u54840 \u52293 \u51076 \u51088 \u47484  \u51648 \u51221 \u54616 \u44256  \u51080 \u49845 \u45768 \u45796 .</p>\
            <div className="bg-gray-50 p-4 rounded-lg mt-2">\
              <p><strong>\uc0\u44060 \u51064 \u51221 \u48372  \u48372 \u54840 \u52293 \u51076 \u51088 </strong></p>\
              <p>\uc0\u51060 \u47700 \u51068 : contact@job-helper.com</p>\
              <p>\uc0\u51204 \u54868 \u48264 \u54840 : 010-XXXX-XXXX</p>\
            </div>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. \uc0\u44060 \u51064 \u51221 \u48372  \u52376 \u47532 \u48169 \u52840  \u48320 \u44221 </h2>\
            <p>\uc0\u51060  \u44060 \u51064 \u51221 \u48372 \u52376 \u47532 \u48169 \u52840 \u51008  \u49884 \u54665 \u51068 \u47196 \u48512 \u53552  \u51201 \u50857 \u46104 \u47728 , \u48277 \u47161  \u48143  \u48169 \u52840 \u50640  \u46384 \u47480  \u48320 \u44221 \u45236 \u50857 \u51032  \u52628 \u44032 , \u49325 \u51228  \u48143  \u51221 \u51221 \u51060  \u51080 \u45716  \u44221 \u50864 \u50640 \u45716  \u48320 \u44221 \u49324 \u54637 \u51032  \u49884 \u54665  7\u51068  \u51204 \u48512 \u53552  \u44277 \u51648 \u49324 \u54637 \u51012  \u53685 \u54616 \u50668  \u44256 \u51648 \u54624  \u44163 \u51077 \u45768 \u45796 .</p>\
            <p className="mt-2"><strong>\uc0\u49884 \u54665 \u51068 \u51088 : 2025\u45380  1\u50900  27\u51068 </strong></p>\
          </section>\
        </div>\
      </div>\
    </div>\
  );\
\}\
\
// \uc0\u51060 \u50857 \u50557 \u44288  \u54168 \u51060 \u51648 \
function TermsOfService() \{\
  return (\
    <div className="max-w-4xl mx-auto">\
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">\
        <h1 className="text-3xl font-bold text-gray-800 mb-8">\uc0\u51060 \u50857 \u50557 \u44288 </h1>\
        \
        <div className="space-y-6 text-gray-700 leading-relaxed">\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 1\u51312  (\u47785 \u51201 )</h2>\
            <p>\uc0\u51060  \u50557 \u44288 \u51008  \u52712 \u51456 \u49373  \u46020 \u50864 \u48120 (\u51060 \u54616  "\u54924 \u49324 ")\u44032  \u51228 \u44277 \u54616 \u45716  \u47784 \u46304  \u49436 \u48708 \u49828 (\u51060 \u54616  "\u49436 \u48708 \u49828 ")\u51032  \u51060 \u50857 \u51312 \u44148  \u48143  \u51208 \u52264 , \u54924 \u49324 \u50752  \u51060 \u50857 \u51088  \u44036 \u51032  \u44428 \u47532 , \u51032 \u47924  \u48143  \u52293 \u51076 \u49324 \u54637 , \u44592 \u53440  \u54596 \u50836 \u54620  \u49324 \u54637 \u51012  \u44508 \u51221 \u54632 \u51012  \u47785 \u51201 \u51004 \u47196  \u54633 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 2\u51312  (\u50857 \u50612 \u51032  \u51221 \u51032 )</h2>\
            <ul className="list-disc list-inside ml-4 space-y-2">\
              <li><strong>"\uc0\u49436 \u48708 \u49828 "</strong>\u46976  \u54924 \u49324 \u44032  \u51228 \u44277 \u54616 \u45716  \u52712 \u50629  \u51456 \u48708  \u51648 \u50896  \u46020 \u44396  \u48143  \u44288 \u47144  \u48512 \u44032  \u49436 \u48708 \u49828  \u51068 \u52404 \u47484  \u51032 \u48120 \u54633 \u45768 \u45796 .</li>\
              <li><strong>"\uc0\u51060 \u50857 \u51088 "</strong>\u46976  \u48376  \u50557 \u44288 \u50640  \u46384 \u46972  \u54924 \u49324 \u44032  \u51228 \u44277 \u54616 \u45716  \u49436 \u48708 \u49828 \u47484  \u51060 \u50857 \u54616 \u45716  \u51088 \u47484  \u51032 \u48120 \u54633 \u45768 \u45796 .</li>\
              <li><strong>"\uc0\u53080 \u53584 \u52768 "</strong>\u46976  \u49436 \u48708 \u49828  \u45236 \u50640 \u49436  \u51228 \u44277 \u46104 \u45716  \u51221 \u48372 , \u53581 \u49828 \u53944 , \u44536 \u47000 \u54589 , \u51060 \u48120 \u51648  \u46321  \u47784 \u46304  \u51088 \u47308 \u47484  \u51032 \u48120 \u54633 \u45768 \u45796 .</li>\
            </ul>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 3\u51312  (\u50557 \u44288 \u51032  \u54952 \u47141  \u48143  \u48320 \u44221 )</h2>\
            <p>\uc0\u9312  \u48376  \u50557 \u44288 \u51008  \u49436 \u48708 \u49828  \u54868 \u47732 \u50640  \u44172 \u49884 \u54616 \u44144 \u45208  \u44592 \u53440 \u51032  \u48169 \u48277 \u51004 \u47196  \u51060 \u50857 \u51088 \u50640 \u44172  \u44277 \u51648 \u54632 \u51004 \u47196 \u50024  \u54952 \u47141 \u51060  \u48156 \u49373 \u54633 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9313  \u54924 \u49324 \u45716  \u54596 \u50836 \u54620  \u44221 \u50864  \u44288 \u47144  \u48277 \u47161 \u51012  \u50948 \u48176 \u54616 \u51648  \u50506 \u45716  \u48276 \u50948 \u50640 \u49436  \u48376  \u50557 \u44288 \u51012  \u48320 \u44221 \u54624  \u49688  \u51080 \u51004 \u47728 , \u48320 \u44221 \u46108  \u50557 \u44288 \u51008  \u49884 \u54665 \u51068  7\u51068  \u51204 \u50640  \u44277 \u51648 \u54633 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9314  \u51060 \u50857 \u51088 \u45716  \u48320 \u44221 \u46108  \u50557 \u44288 \u50640  \u46041 \u51032 \u54616 \u51648  \u50506 \u51012  \u44221 \u50864  \u49436 \u48708 \u49828  \u51060 \u50857 \u51012  \u51473 \u45800 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 4\u51312  (\u49436 \u48708 \u49828 \u51032  \u51228 \u44277 )</h2>\
            <p>\uc0\u54924 \u49324 \u45716  \u45796 \u51020 \u44284  \u44057 \u51008  \u49436 \u48708 \u49828 \u47484  \u51228 \u44277 \u54633 \u45768 \u45796 :</p>\
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">\
              <li>\uc0\u51088 \u49548 \u49436  \u51068 \u51221  \u44288 \u47532  \u46020 \u44396 </li>\
              <li>\uc0\u44544 \u51088 \u49688  \u49464 \u44592  \u46020 \u44396 </li>\
              <li>\uc0\u50724 \u45720 \u51032  \u50868 \u49464  \u49436 \u48708 \u49828 </li>\
              <li>1\uc0\u51068  1\u52828 \u51208  \u53080 \u53584 \u52768 </li>\
              <li>\uc0\u44592 \u53440  \u52712 \u50629  \u51456 \u48708  \u51648 \u50896  \u44288 \u47144  \u49436 \u48708 \u49828 </li>\
            </ul>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 5\u51312  (\u49436 \u48708 \u49828 \u51032  \u48320 \u44221  \u48143  \u51473 \u45800 )</h2>\
            <p>\uc0\u9312  \u54924 \u49324 \u45716  \u50868 \u50689 \u49345 , \u44592 \u49696 \u49345 \u51032  \u54596 \u50836 \u50640  \u46384 \u46972  \u51228 \u44277 \u54616 \u44256  \u51080 \u45716  \u49436 \u48708 \u49828 \u47484  \u48320 \u44221 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9313  \u54924 \u49324 \u45716  \u45796 \u51020  \u44033  \u54840 \u50640  \u54644 \u45817 \u54616 \u45716  \u44221 \u50864  \u49436 \u48708 \u49828  \u51228 \u44277 \u51012  \u51068 \u49884 \u51201 \u51004 \u47196  \u51473 \u45800 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 :</p>\
            <ul className="list-disc list-inside ml-4 mt-2">\
              <li>\uc0\u49884 \u49828 \u53596  \u51216 \u44160 , \u48372 \u49688 , \u44368 \u52404  \u49884 </li>\
              <li>\uc0\u53685 \u49888  \u51109 \u50528  \u48156 \u49373  \u49884 </li>\
              <li>\uc0\u52380 \u51116 \u51648 \u48320 , \u48708 \u49345 \u49324 \u53468  \u46321  \u48520 \u44032 \u54637 \u47141 \u51201  \u49324 \u50976  \u48156 \u49373  \u49884 </li>\
            </ul>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 6\u51312  (\u51060 \u50857 \u51088 \u51032  \u51032 \u47924 )</h2>\
            <p>\uc0\u51060 \u50857 \u51088 \u45716  \u45796 \u51020  \u54665 \u50948 \u47484  \u54616 \u50668 \u49436 \u45716  \u50504  \u46121 \u45768 \u45796 :</p>\
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">\
              <li>\uc0\u53440 \u51064 \u51032  \u51221 \u48372  \u46020 \u50857 </li>\
              <li>\uc0\u54924 \u49324 \u44032  \u51228 \u44277 \u54616 \u45716  \u51221 \u48372 \u51032  \u47924 \u45800  \u48320 \u44221 </li>\
              <li>\uc0\u54924 \u49324 \u44032  \u51221 \u54620  \u51221 \u48372  \u51060 \u50808 \u51032  \u51221 \u48372  \u49569 \u49888  \u46608 \u45716  \u44172 \u49884 </li>\
              <li>\uc0\u54924 \u49324  \u46608 \u45716  \u51228 3\u51088 \u51032  \u51200 \u51089 \u44428  \u46321  \u51648 \u51201 \u51116 \u49328 \u44428  \u52840 \u54644 </li>\
              <li>\uc0\u54924 \u49324  \u46608 \u45716  \u51228 3\u51088 \u51032  \u47749 \u50696 \u47484  \u49552 \u49345 \u49884 \u53412 \u44144 \u45208  \u50629 \u47924 \u47484  \u48169 \u54644 \u54616 \u45716  \u54665 \u50948 </li>\
              <li>\uc0\u50808 \u49444  \u46608 \u45716  \u54253 \u47141 \u51201 \u51064  \u47700 \u49884 \u51648 , \u54868 \u49345 , \u51020 \u49457 , \u44592 \u53440  \u44277 \u49436 \u50577 \u49549 \u50640  \u48152 \u54616 \u45716  \u51221 \u48372 \u47484  \u44277 \u44060  \u46608 \u45716  \u44172 \u49884 \u54616 \u45716  \u54665 \u50948 </li>\
            </ul>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 7\u51312  (\u51200 \u51089 \u44428 \u51032  \u44480 \u49549 )</h2>\
            <p>\uc0\u9312  \u54924 \u49324 \u44032  \u51228 \u51089 \u54620  \u49436 \u48708 \u49828  \u45236 \u51032  \u47784 \u46304  \u53080 \u53584 \u52768 \u50640  \u45824 \u54620  \u51200 \u51089 \u44428  \u48143  \u44592 \u53440  \u51648 \u51201 \u51116 \u49328 \u44428 \u51008  \u54924 \u49324 \u50640  \u44480 \u49549 \u46121 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9313  \u51060 \u50857 \u51088 \u45716  \u54924 \u49324 \u44032  \u51228 \u44277 \u54616 \u45716  \u49436 \u48708 \u49828 \u47484  \u51060 \u50857 \u54632 \u51004 \u47196 \u50024  \u50619 \u51008  \u51221 \u48372 \u47484  \u54924 \u49324 \u51032  \u49324 \u51204  \u49849 \u45209  \u50630 \u51060  \u48373 \u51228 , \u49569 \u49888 , \u52636 \u54032 , \u48176 \u54252 , \u48169 \u49569  \u46321  \u44592 \u53440  \u48169 \u48277 \u50640  \u51032 \u54616 \u50668  \u50689 \u47532  \u47785 \u51201 \u51004 \u47196  \u51060 \u50857 \u54616 \u44144 \u45208  \u51228 3\u51088 \u50640 \u44172  \u51060 \u50857 \u54616 \u44172  \u54616 \u50668 \u49436 \u45716  \u50504  \u46121 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 8\u51312  (\u47732 \u52293 \u51312 \u54637 )</h2>\
            <p>\uc0\u9312  \u54924 \u49324 \u45716  \u52380 \u51116 \u51648 \u48320  \u46608 \u45716  \u51060 \u50640  \u51456 \u54616 \u45716  \u48520 \u44032 \u54637 \u47141 \u51004 \u47196  \u51064 \u54616 \u50668  \u49436 \u48708 \u49828 \u47484  \u51228 \u44277 \u54624  \u49688  \u50630 \u45716  \u44221 \u50864 \u50640 \u45716  \u49436 \u48708 \u49828  \u51228 \u44277 \u50640  \u44288 \u54620  \u52293 \u51076 \u51060  \u47732 \u51228 \u46121 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9313  \u54924 \u49324 \u45716  \u51060 \u50857 \u51088 \u51032  \u44480 \u52293 \u49324 \u50976 \u47196  \u51064 \u54620  \u49436 \u48708 \u49828  \u51060 \u50857 \u51032  \u51109 \u50528 \u50640  \u45824 \u54616 \u50668  \u52293 \u51076 \u51012  \u51648 \u51648  \u50506 \u49845 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9314  \u54924 \u49324 \u45716  \u49436 \u48708 \u49828 \u47484  \u53685 \u54644  \u51228 \u44277 \u46104 \u45716  \u51221 \u48372 \u51032  \u51221 \u54869 \u49457 , \u49888 \u47280 \u49457  \u46321 \u50640  \u45824 \u54644 \u49436 \u45716  \u48372 \u51613 \u54616 \u51648  \u50506 \u51004 \u47728 , \u51060 \u50857 \u51088 \u45716  \u48376 \u51064 \u51032  \u54032 \u45800 \u44284  \u52293 \u51076  \u54616 \u50640  \u49436 \u48708 \u49828 \u47484  \u51060 \u50857 \u54644 \u50556  \u54633 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9315  \u54924 \u49324 \u45716  \u51060 \u50857 \u51088  \u44036  \u46608 \u45716  \u51060 \u50857 \u51088 \u50752  \u51228 3\u51088  \u44036 \u50640  \u49436 \u48708 \u49828 \u47484  \u47588 \u44060 \u47196  \u48156 \u49373 \u54620  \u48516 \u51137 \u50640  \u45824 \u54644  \u44060 \u51077 \u54624  \u51032 \u47924 \u44032  \u50630 \u51004 \u47728 , \u51060 \u47196  \u51064 \u54620  \u49552 \u54644 \u47484  \u48176 \u49345 \u54624  \u52293 \u51076 \u46020  \u50630 \u49845 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 9\u51312  (\u44305 \u44256  \u44172 \u51116 )</h2>\
            <p>\uc0\u9312  \u54924 \u49324 \u45716  \u49436 \u48708 \u49828  \u50868 \u50689 \u44284  \u44288 \u47144 \u54616 \u50668  \u49436 \u48708 \u49828  \u54868 \u47732 , \u54856 \u54168 \u51060 \u51648  \u46321 \u50640  \u44305 \u44256 \u47484  \u44172 \u51116 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9313  \u51060 \u50857 \u51088 \u45716  \u49436 \u48708 \u49828  \u51060 \u50857  \u49884  \u45432 \u52636 \u46104 \u45716  \u44305 \u44256 \u50640  \u45824 \u54644  \u46041 \u51032 \u54616 \u45716  \u44163 \u51004 \u47196  \u44036 \u51452 \u46121 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9314  \u54924 \u49324 \u45716  \u44305 \u44256  \u45236 \u50857 \u50640  \u45824 \u54620  \u52293 \u51076 \u51012  \u51648 \u51648  \u50506 \u51004 \u47728 , \u51060 \u50857 \u51088 \u44032  \u44305 \u44256 \u47484  \u53685 \u54644  \u50808 \u48512  \u49324 \u51060 \u53944 \u47484  \u51060 \u50857 \u54616 \u44144 \u45208  \u44305 \u44256 \u51452 \u50752  \u44144 \u47000 \u54624  \u44221 \u50864  \u48156 \u49373 \u54616 \u45716  \u47928 \u51228 \u50640  \u45824 \u54644  \u52293 \u51076 \u51648 \u51648  \u50506 \u49845 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u51228 10\u51312  (\u48516 \u51137 \u51032  \u54644 \u44208 )</h2>\
            <p>\uc0\u9312  \u54924 \u49324 \u50752  \u51060 \u50857 \u51088 \u45716  \u49436 \u48708 \u49828 \u50752  \u44288 \u47144 \u54616 \u50668  \u48156 \u49373 \u54620  \u48516 \u51137 \u51012  \u50896 \u47564 \u54616 \u44172  \u54644 \u44208 \u54616 \u44592  \u50948 \u54616 \u50668  \u54596 \u50836 \u54620  \u47784 \u46304  \u45432 \u47141 \u51012  \u54616 \u50668 \u50556  \u54633 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9313  \u51204 \u54637 \u51032  \u45432 \u47141 \u50640 \u46020  \u48520 \u44396 \u54616 \u44256  \u48516 \u51137 \u51060  \u54644 \u44208 \u46104 \u51648  \u50506 \u51012  \u44221 \u50864 , \u50577  \u45817 \u49324 \u51088 \u45716  \u48124 \u49324 \u49548 \u49569 \u48277 \u49345 \u51032  \u44288 \u54624 \u48277 \u50896 \u50640  \u49548 \u49569 \u51012  \u51228 \u44592 \u54624  \u49688  \u51080 \u49845 \u45768 \u45796 .</p>\
            <p className="mt-2">\uc0\u9314  \u48376  \u50557 \u44288 \u51008  \u45824 \u54620 \u48124 \u44397  \u48277 \u47456 \u50640  \u46384 \u46972  \u44508 \u50984 \u46104 \u44256  \u54644 \u49437 \u46121 \u45768 \u45796 .</p>\
          </section>\
\
          <section>\
            <h2 className="text-xl font-bold text-gray-800 mb-3">\uc0\u48512 \u52825 </h2>\
            <p><strong>\uc0\u49884 \u54665 \u51068 \u51088 : 2025\u45380  1\u50900  27\u51068 </strong></p>\
          </section>\
        </div>\
      </div>\
    </div>\
  );\
\}\
\
// \uc0\u54924 \u49324 \u49548 \u44060  \u54168 \u51060 \u51648 \
function AboutUs() \{\
  return (\
    <div className="max-w-4xl mx-auto">\
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">\
        <div className="text-center mb-12">\
          <h1 className="text-4xl font-bold text-gray-800 mb-4">\uc0\u52712 \u51456 \u49373  \u46020 \u50864 \u48120 </h1>\
          <p className="text-xl text-gray-600">\uc0\u52712 \u50629  \u51456 \u48708 \u49373 \u51012  \u50948 \u54620  \u51333 \u54633  \u51648 \u50896  \u54540 \u47019 \u54268 </p>\
        </div>\
\
        <div className="space-y-8">\
          <section>\
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">\
              <Heart className="text-rose-500" fill="currentColor" />\
              \uc0\u50864 \u47532 \u51032  \u48120 \u49496 \
            </h2>\
            <p className="text-gray-700 leading-relaxed text-lg">\
              \uc0\u52712 \u51456 \u49373  \u46020 \u50864 \u48120 \u45716  \u52712 \u50629 \u51012  \u51456 \u48708 \u54616 \u45716  \u47784 \u46304  \u48516 \u46308 \u51060  \u48372 \u45796  \u54952 \u50984 \u51201 \u51060 \u44256  \u52404 \u44228 \u51201 \u51004 \u47196  \u51456 \u48708 \u54624  \u49688  \u51080 \u46020 \u47197  \u46037 \u44592  \u50948 \u54644  \u47564 \u46308 \u50612 \u51276 \u49845 \u45768 \u45796 . \
              \uc0\u48373 \u51105 \u54616 \u44256  \u55192 \u46304  \u52712 \u50629  \u51456 \u48708  \u44284 \u51221 \u50640 \u49436  \u51089 \u51008  \u46020 \u50880 \u51060 \u46972 \u46020  \u46104 \u44256 \u51088  \u54633 \u45768 \u45796 .\
            </p>\
          </section>\
\
          <section>\
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">\
              <Sparkles className="text-yellow-500" />\
              \uc0\u51228 \u44277  \u49436 \u48708 \u49828 \
            </h2>\
            <div className="grid md:grid-cols-2 gap-4">\
              <div className="bg-blue-50 rounded-xl p-6">\
                <div className="flex items-center gap-2 mb-2">\
                  <Calendar className="text-blue-600" size=\{24\} />\
                  <h3 className="font-bold text-gray-800">\uc0\u51088 \u49548 \u49436  \u51068 \u51221  \u44288 \u47532 </h3>\
                </div>\
                <p className="text-gray-700 text-sm">\uc0\u50668 \u47084  \u44592 \u50629 \u51032  \u51088 \u49548 \u49436  \u51089 \u49457  \u51068 \u51221 \u51012  \u54620 \u45576 \u50640  \u44288 \u47532 \u54616 \u49464 \u50836 </p>\
              </div>\
\
              <div className="bg-indigo-50 rounded-xl p-6">\
                <div className="flex items-center gap-2 mb-2">\
                  <Type className="text-indigo-600" size=\{24\} />\
                  <h3 className="font-bold text-gray-800">\uc0\u44544 \u51088 \u49688  \u49464 \u44592 </h3>\
                </div>\
                <p className="text-gray-700 text-sm">\uc0\u44277 \u48177  \u54252 \u54632 /\u51228 \u50808 , \u45800 \u50612 \u49688 \u44620 \u51648  \u51221 \u54869 \u54616 \u44172  \u54869 \u51064 </p>\
              </div>\
\
              <div className="bg-purple-50 rounded-xl p-6">\
                <div className="flex items-center gap-2 mb-2">\
                  <Sparkles className="text-purple-600" size=\{24\} />\
                  <h3 className="font-bold text-gray-800">\uc0\u50724 \u45720 \u51032  \u50868 \u49464 </h3>\
                </div>\
                <p className="text-gray-700 text-sm">\uc0\u54616 \u47336 \u47484  \u44557 \u51221 \u51201 \u51004 \u47196  \u49884 \u51089 \u54616 \u45716  \u51089 \u51008  \u51025 \u50896 </p>\
              </div>\
\
              <div className="bg-rose-50 rounded-xl p-6">\
                <div className="flex items-center gap-2 mb-2">\
                  <Heart className="text-rose-600" size=\{24\} fill="currentColor" />\
                  <h3 className="font-bold text-gray-800">1\uc0\u51068  1\u52828 \u51208 </h3>\
                </div>\
                <p className="text-gray-700 text-sm">\uc0\u51089 \u51008  \u52828 \u51208 \u47196  \u49464 \u49345 \u50640  \u54665 \u50868 \u51012  \u51204 \u54616 \u49464 \u50836 </p>\
              </div>\
            </div>\
          </section>\
\
          <section>\
            <h2 className="text-2xl font-bold text-gray-800 mb-4">\uc0\u50864 \u47532 \u51032  \u50557 \u49549 </h2>\
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">\
              <ul className="space-y-3 text-gray-700">\
                <li className="flex items-start gap-2">\
                  <span className="text-blue-600 font-bold">\uc0\u10003 </span>\
                  <span>\uc0\u54637 \u49345  \u47924 \u47308 \u47196  \u51228 \u44277 \u46104 \u45716  \u49436 \u48708 \u49828 </span>\
                </li>\
                <li className="flex items-start gap-2">\
                  <span className="text-blue-600 font-bold">\uc0\u10003 </span>\
                  <span>\uc0\u44060 \u51064 \u51221 \u48372 \u47484  \u49688 \u51665 \u54616 \u51648  \u50506 \u45716  \u50504 \u51204 \u54620  \u49436 \u48708 \u49828 </span>\
                </li>\
                <li className="flex items-start gap-2">\
                  <span className="text-blue-600 font-bold">\uc0\u10003 </span>\
                  <span>\uc0\u49324 \u50857 \u51088  \u44221 \u54744 \u51012  \u52572 \u50864 \u49440 \u51004 \u47196  \u54616 \u45716  \u49436 \u48708 \u49828  \u44060 \u49440 </span>\
                </li>\
                <li className="flex items-start gap-2">\
                  <span className="text-blue-600 font-bold">\uc0\u10003 </span>\
                  <span>\uc0\u52712 \u50629  \u51456 \u48708 \u49373 \u46308 \u51012  \u50948 \u54620  \u51648 \u49549 \u51201 \u51064  \u51025 \u50896 \u44284  \u51648 \u50896 </span>\
                </li>\
              </ul>\
            </div>\
          </section>\
\
          <section>\
            <h2 className="text-2xl font-bold text-gray-800 mb-4">\uc0\u50672 \u46973 \u52376 </h2>\
            <div className="bg-gray-50 rounded-xl p-6">\
              <div className="space-y-3">\
                <div>\
                  <p className="text-gray-600 text-sm mb-1">\uc0\u51060 \u47700 \u51068 </p>\
                  <p className="text-gray-800 font-medium">contact@job-helper.com</p>\
                </div>\
                <div>\
                  <p className="text-gray-600 text-sm mb-1">\uc0\u50868 \u50689  \u49884 \u44036 </p>\
                  <p className="text-gray-800">\uc0\u54217 \u51068  10:00 - 18:00 (\u51452 \u47568  \u48143  \u44277 \u55092 \u51068  \u51228 \u50808 )</p>\
                </div>\
                <div>\
                  <p className="text-gray-600 text-sm mb-1">\uc0\u47928 \u51032  \u49324 \u54637 </p>\
                  <p className="text-gray-800">\uc0\u49436 \u48708 \u49828  \u44060 \u49440  \u51228 \u50504 , \u48260 \u44536  \u51228 \u48372 , \u54801 \u50629  \u47928 \u51032  \u46321  \u50616 \u51228 \u46304  \u50672 \u46973 \u51452 \u49464 \u50836 !</p>\
                </div>\
              </div>\
            </div>\
          </section>\
\
          <section className="text-center pt-8 border-t border-gray-200">\
            <div className="mb-6">\
              <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto">\
                <g className="animate-pulse">\
                  <line x1="100" y1="80" x2="100" y2="20" stroke="#FFD700" strokeWidth="3" opacity="0.8" />\
                  <circle cx="100" cy="15" r="8" fill="#FFD700" opacity="0.9" />\
                </g>\
                <circle cx="100" cy="100" r="40" fill="#FF9966" />\
                <polygon points="70,75 65,55 85,70" fill="#FF9966" />\
                <polygon points="130,75 135,55 115,70" fill="#FF9966" />\
                <path d="M 85 95 Q 90 100 95 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />\
                <path d="M 105 95 Q 110 100 115 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />\
                <polygon points="100,105 95,110 105,110" fill="#FF6B6B" />\
              </svg>\
            </div>\
            <h3 className="text-2xl font-bold text-gray-800 mb-2">\uc0\u51096  \u46112  \u44144 \u50696 \u50836 </h3>\
            <p className="text-xl text-gray-600">\uc0\u50668 \u47084 \u48516 \u51032  \u52712 \u50629 \u51012  \u51652 \u49900 \u51004 \u47196  \u51025 \u50896 \u54633 \u45768 \u45796 ! \u55357 \u56490 </p>\
          </section>\
        </div>\
      </div>\
    </div>\
  );\
\}\
function ScheduleManager() \{\
  const [schedules, setSchedules] = useState([]);\
  const [showAddModal, setShowAddModal] = useState(false);\
  const [formData, setFormData] = useState(\{\
    company: '',\
    startDate: '',\
    endDate: '',\
    memo: ''\
  \});\
\
  const handleAddSchedule = () => \{\
    if (!formData.company || !formData.startDate || !formData.endDate) \{\
      alert('\uc0\u44592 \u50629 \u47749 \u44284  \u49884 \u51089 \u51068 , \u47560 \u44048 \u51068 \u51012  \u51077 \u47141 \u54644 \u51452 \u49464 \u50836 !');\
      return;\
    \}\
\
    setSchedules([...schedules, \{ id: Date.now(), ...formData \}]);\
    setFormData(\{ company: '', startDate: '', endDate: '', memo: '' \});\
    setShowAddModal(false);\
  \};\
\
  return (\
    <div className="max-w-4xl mx-auto">\
      <div className="bg-white rounded-2xl shadow-xl p-8">\
        <div className="flex items-center justify-between mb-6">\
          <div className="flex items-center gap-3">\
            <Calendar className="text-blue-600" size=\{32\} />\
            <h2 className="text-3xl font-bold text-gray-800">\uc0\u51088 \u49548 \u49436  \u51068 \u51221  \u44288 \u47532 </h2>\
          </div>\
          <button\
            onClick=\{() => setShowAddModal(true)\}\
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"\
          >\
            + \uc0\u51068 \u51221  \u52628 \u44032 \
          </button>\
        </div>\
\
        <div className="space-y-3">\
          \{schedules.length === 0 ? (\
            <p className="text-gray-500 text-center py-12">\uc0\u46321 \u47197 \u46108  \u51068 \u51221 \u51060  \u50630 \u49845 \u45768 \u45796 .</p>\
          ) : (\
            schedules.map(schedule => (\
              <div key=\{schedule.id\} className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-all">\
                <h4 className="font-bold text-gray-800 text-lg">\{schedule.company\}</h4>\
                <p className="text-sm text-gray-600 mt-1">\
                  \{schedule.startDate\} ~ \{schedule.endDate\}\
                </p>\
                \{schedule.memo && <p className="text-sm text-gray-500 mt-2">\{schedule.memo\}</p>\}\
              </div>\
            ))\
          )\}\
        </div>\
      </div>\
\
      \{showAddModal && (\
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">\
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">\
            <div className="flex items-center justify-between mb-6">\
              <h3 className="text-2xl font-bold">\uc0\u51068 \u51221  \u52628 \u44032 </h3>\
              <button onClick=\{() => setShowAddModal(false)\}>\
                <X size=\{24\} />\
              </button>\
            </div>\
\
            <div className="space-y-4">\
              <div>\
                <label className="block text-gray-700 font-medium mb-2">\uc0\u44592 \u50629 \u47749 </label>\
                <input\
                  type="text"\
                  value=\{formData.company\}\
                  onChange=\{(e) => setFormData(\{...formData, company: e.target.value\})\}\
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"\
                  placeholder="\uc0\u50696 : \u49340 \u49457 \u51204 \u51088 "\
                />\
              </div>\
\
              <div>\
                <label className="block text-gray-700 font-medium mb-2">\uc0\u51089 \u49457  \u49884 \u51089 \u51068 </label>\
                <input\
                  type="date"\
                  value=\{formData.startDate\}\
                  onChange=\{(e) => setFormData(\{...formData, startDate: e.target.value\})\}\
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"\
                />\
              </div>\
\
              <div>\
                <label className="block text-gray-700 font-medium mb-2">\uc0\u47560 \u44048 \u51068 </label>\
                <input\
                  type="date"\
                  value=\{formData.endDate\}\
                  onChange=\{(e) => setFormData(\{...formData, endDate: e.target.value\})\}\
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"\
                />\
              </div>\
\
              <div>\
                <label className="block text-gray-700 font-medium mb-2">\uc0\u47700 \u47784  (\u49440 \u53469 )</label>\
                <textarea\
                  value=\{formData.memo\}\
                  onChange=\{(e) => setFormData(\{...formData, memo: e.target.value\})\}\
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"\
                  rows="3"\
                />\
              </div>\
\
              <button\
                onClick=\{handleAddSchedule\}\
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"\
              >\
                \uc0\u52628 \u44032 \u54616 \u44592 \
              </button>\
            </div>\
          </div>\
        </div>\
      )\}\
    </div>\
  );\
\}\
\
// \uc0\u54856  \u54168 \u51060 \u51648  \u52980 \u54252 \u45324 \u53944 \
function HomePage() \{\
  return (\
    <div className="max-w-3xl mx-auto flex items-center justify-center" style=\{\{ minHeight: 'calc(100vh - 200px)' \}\}>\
      <div className="w-full text-center">\
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">\
          \{/* \uc0\u54665 \u50868 \u48724  \u44256 \u50577 \u51060  */\}\
          <div className="mb-8">\
            <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">\
              \{/* \uc0\u54665 \u50868 \u48724  */\}\
              <g className="animate-pulse">\
                <line x1="100" y1="80" x2="100" y2="20" stroke="#FFD700" strokeWidth="3" opacity="0.8" />\
                <line x1="90" y1="80" x2="80" y2="20" stroke="#FFD700" strokeWidth="2" opacity="0.6" />\
                <line x1="110" y1="80" x2="120" y2="20" stroke="#FFD700" strokeWidth="2" opacity="0.6" />\
                <circle cx="100" cy="15" r="8" fill="#FFD700" opacity="0.9" />\
                <circle cx="80" cy="15" r="5" fill="#FFA500" opacity="0.7" />\
                <circle cx="120" cy="15" r="5" fill="#FFA500" opacity="0.7" />\
                \
                \{/* \uc0\u48152 \u51677 \u51076  */\}\
                <circle cx="70" cy="40" r="3" fill="#FFFF00" opacity="0.8" />\
                <circle cx="130" cy="35" r="3" fill="#FFFF00" opacity="0.8" />\
                <circle cx="95" cy="50" r="2" fill="#FFD700" opacity="0.9" />\
                <circle cx="105" cy="45" r="2" fill="#FFD700" opacity="0.9" />\
              </g>\
              \
              \{/* \uc0\u44256 \u50577 \u51060  \u47672 \u47532  */\}\
              <circle cx="100" cy="100" r="40" fill="#FF9966" />\
              \
              \{/* \uc0\u50812 \u51901  \u44480  */\}\
              <polygon points="70,75 65,55 85,70" fill="#FF9966" />\
              <polygon points="72,72 70,60 80,70" fill="#FFB399" />\
              \
              \{/* \uc0\u50724 \u47480 \u51901  \u44480  */\}\
              <polygon points="130,75 135,55 115,70" fill="#FF9966" />\
              <polygon points="128,72 130,60 120,70" fill="#FFB399" />\
              \
              \{/* \uc0\u45576  (\u44048 \u51008  \u45576 ) */\}\
              <path d="M 85 95 Q 90 100 95 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />\
              <path d="M 105 95 Q 110 100 115 95" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />\
              \
              \{/* \uc0\u53076  */\}\
              <polygon points="100,105 95,110 105,110" fill="#FF6B6B" />\
              \
              \{/* \uc0\u51077  */\}\
              <path d="M 100 110 Q 90 115 85 110" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />\
              <path d="M 100 110 Q 110 115 115 110" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />\
              \
              \{/* \uc0\u49688 \u50684  */\}\
              <line x1="60" y1="100" x2="80" y2="98" stroke="#333" strokeWidth="1.5" />\
              <line x1="60" y1="105" x2="80" y2="105" stroke="#333" strokeWidth="1.5" />\
              <line x1="120" y1="98" x2="140" y2="100" stroke="#333" strokeWidth="1.5" />\
              <line x1="120" y1="105" x2="140" y2="105" stroke="#333" strokeWidth="1.5" />\
              \
              \{/* \uc0\u47800 \u53685  */\}\
              <ellipse cx="100" cy="150" rx="35" ry="30" fill="#FF9966" />\
              \
              \{/* \uc0\u48156  */\}\
              <ellipse cx="85" cy="175" rx="8" ry="12" fill="#FF9966" />\
              <ellipse cx="115" cy="175" rx="8" ry="12" fill="#FF9966" />\
              \
              \{/* \uc0\u44844 \u47532  */\}\
              <path d="M 130 160 Q 145 165 150 150 Q 155 135 145 125" stroke="#FF9966" strokeWidth="10" fill="none" strokeLinecap="round" />\
            </svg>\
          </div>\
\
          \{/* \uc0\u47700 \u49884 \u51648  */\}\
          <div className="space-y-6">\
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">\
              \uc0\u51096  \u46112  \u44144 \u50696 \u50836 \
            </h1>\
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">\
              \uc0\u51096  \u46112 \u44620 \u50836 ?\
            </h2>\
            <h3 className="text-4xl md:text-5xl font-bold text-gray-800">\
              \uc0\u51096  \u46104 \u50556 \u44192 \u51424 \
            </h3>\
            \
            <p className="mt-8 text-gray-500 text-lg">\
              \uc0\u52712 \u50629  \u51456 \u48708 , \u54632 \u44760  \u51025 \u50896 \u54633 \u45768 \u45796  \u55357 \u56490 \
            </p>\
          </div>\
        </div>\
      </div>\
    </div>\
  );\
\}\
\
// \uc0\u47700 \u51064  \u54856 \u54168 \u51060 \u51648 \
export default function JobHelperHomepage() \{\
  const [activeTab, setActiveTab] = useState('home');\
  const [showMobileMenu, setShowMobileMenu] = useState(false);\
\
  const tabs = [\
    \{ id: 'home', name: '\uc0\u54856 ', icon: Heart \},\
    \{ id: 'schedule', name: '\uc0\u51068 \u51221 \u44288 \u47532 ', icon: Calendar \},\
    \{ id: 'counter', name: '\uc0\u44544 \u51088 \u49688 \u49464 \u44592 ', icon: Type \},\
    \{ id: 'fortune', name: '\uc0\u50724 \u45720 \u51032 \u50868 \u49464 ', icon: Sparkles \},\
    \{ id: 'kindness', name: '1\uc0\u51068 1\u52828 \u51208 ', icon: Heart \}\
  ];\
\
  const footerLinks = [\
    \{ id: 'privacy', name: '\uc0\u44060 \u51064 \u51221 \u48372 \u52376 \u47532 \u48169 \u52840 ' \},\
    \{ id: 'terms', name: '\uc0\u51060 \u50857 \u50557 \u44288 ' \},\
    \{ id: 'about', name: '\uc0\u54924 \u49324 \u49548 \u44060 ' \}\
  ];\
\
  return (\
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">\
      \{/* \uc0\u54756 \u45908  */\}\
      <header className="bg-white shadow-md sticky top-0 z-40">\
        <div className="max-w-7xl mx-auto px-4 py-4">\
          <div className="flex items-center justify-between">\
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">\
              \uc0\u52712 \u51456 \u49373  \u46020 \u50864 \u48120 \
            </h1>\
            \
            \{/* \uc0\u47784 \u48148 \u51068  \u47700 \u45684  \u48260 \u53948  */\}\
            <button\
              onClick=\{() => setShowMobileMenu(!showMobileMenu)\}\
              className="md:hidden p-2"\
            >\
              \{showMobileMenu ? <X size=\{24\} /> : <Menu size=\{24\} />\}\
            </button>\
\
            \{/* \uc0\u45936 \u49828 \u53356 \u53457  \u45348 \u48708 \u44172 \u51060 \u49496  */\}\
            <nav className="hidden md:flex gap-2">\
              \{tabs.map(tab => \{\
                const Icon = tab.icon;\
                return (\
                  <button\
                    key=\{tab.id\}\
                    onClick=\{() => setActiveTab(tab.id)\}\
                    className=\{`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all $\{\
                      activeTab === tab.id\
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'\
                        : 'text-gray-600 hover:bg-gray-100'\
                    \}`\}\
                  >\
                    <Icon size=\{20\} />\
                    \{tab.name\}\
                  </button>\
                );\
              \})\}\
            </nav>\
          </div>\
\
          \{/* \uc0\u47784 \u48148 \u51068  \u45348 \u48708 \u44172 \u51060 \u49496  */\}\
          \{showMobileMenu && (\
            <nav className="md:hidden mt-4 space-y-2">\
              \{tabs.map(tab => \{\
                const Icon = tab.icon;\
                return (\
                  <button\
                    key=\{tab.id\}\
                    onClick=\{() => \{\
                      setActiveTab(tab.id);\
                      setShowMobileMenu(false);\
                    \}\}\
                    className=\{`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all $\{\
                      activeTab === tab.id\
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'\
                        : 'text-gray-600 hover:bg-gray-100'\
                    \}`\}\
                  >\
                    <Icon size=\{20\} />\
                    \{tab.name\}\
                  </button>\
                );\
              \})\}\
            </nav>\
          )\}\
        </div>\
      </header>\
\
      \{/* \uc0\u47700 \u51064  \u52968 \u53584 \u52768  */\}\
      <main className="max-w-7xl mx-auto px-4 py-8">\
        \{activeTab === 'home' && <HomePage />\}\
        \{activeTab === 'schedule' && <ScheduleManager />\}\
        \{activeTab === 'counter' && <CharacterCounter />\}\
        \{activeTab === 'fortune' && <FortuneTeller />\}\
        \{activeTab === 'kindness' && <DailyKindness />\}\
        \{activeTab === 'privacy' && <PrivacyPolicy />\}\
        \{activeTab === 'terms' && <TermsOfService />\}\
        \{activeTab === 'about' && <AboutUs />\}\
      </main>\
\
      \{/* \uc0\u54392 \u53552  */\}\
      <footer className="bg-white mt-12 py-8 border-t border-gray-200">\
        <div className="max-w-7xl mx-auto px-4">\
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">\
            <p className="text-gray-600">\uc0\u52712 \u50629  \u51456 \u48708 , \u54868 \u51060 \u54021 ! \u55357 \u56490 </p>\
            <div className="flex gap-6">\
              \{footerLinks.map(link => (\
                <button\
                  key=\{link.id\}\
                  onClick=\{() => setActiveTab(link.id)\}\
                  className="text-gray-600 hover:text-gray-800 text-sm transition-colors"\
                >\
                  \{link.name\}\
                </button>\
              ))\}\
            </div>\
          </div>\
          <p className="text-center text-gray-500 text-xs mt-4">\
            \'a9 2025 \uc0\u52712 \u51456 \u49373  \u46020 \u50864 \u48120 . All rights reserved.\
          </p>\
        </div>\
      </footer>\
    </div>\
  );\
\}}
