const {
MSG_AFTER_OEM, MSG_AFTER_EQUIP, MSG_AFTER_RF, MSG_SERVICES_HTML, MSG_PAYMENT_RECEIVED_MANUAL, MSG_SUBS_CONFIRMED_FREE_RF, MSG_REPORT_REQUESTED_OK, MSG_VAG_AWAITING
} = require('./messages');

// как просил — одной строкой (добавь свои значения)
const BRANDS_LIST =   ['Alfa Romeo','Alpine','Audi','Bentley','BMW','BMW MOTO','BMW ЭЛЕКТРО',
  'Cadillac','Chrysler','Citroen','Cupra','Dacia','Dodge','DS','Fiat','Ford',
  'GMC','Hyundai','Infiniti','Jaguar','Jeep','KIA','LADA','Lamborghini','Lancia',
  'Land Rover','LINCOLN','Mazda','Mercedes','Mini','Mitsubishi','Nissan','Opel',
  'Porsche','RAM','Renault','Rolls-Royce','SEAT','SKODA','Smart','Suzuki',
  'Toyota','Volvo','Volkswagen','Genesis','Peugeot','Honda','Buick','Ssang Young','Lexus',
];
const ALLOWED_BRANDS = new Set(BRANDS_LIST);

// одной строкой — добавишь свой мап
const WMI_TO_BRAND = {
  "ZAR":"Alfa Romeo","ZLA":"Lancia","ZFA":"Fiat","ZHW":"Lamborghini",
  "SCB":"Bentley","SCA":"Rolls-Royce",
  "WAU":"Audi","WA1":"Audi","WUA":"Audi","TRU":"Audi",
  "WBA":"BMW","WBS":"BMW","WBX":"BMW","WBY":"BMW ЭЛЕКТРО",
  "WMW":"Mini","WMZ":"Mini",
  "WDB":"Mercedes","WDD":"Mercedes","W1K":"Mercedes","W1N":"Mercedes",
  "WME":"Smart",
  "WP0":"Porsche","WP1":"Porsche",
  "WVW":"Volkswagen","WVG":"Volkswagen","WV1":"Volkswagen",
  "W0L":"Opel",
  "VF1":"Renault","VF3":"Peugeot","VF7":"Citroen",
  "VSS":"SEAT",
  "UU1":"Dacia",
  "TMB":"SKODA",
  "SAJ":"Jaguar","SAL":"Land Rover","SAD":"Land Rover",
  "1G4":"Buick","2G4":"Buick","3G4":"Buick",
  "1G6":"Cadillac","2G6":"Cadillac","3G6":"Cadillac",
  "1GT":"GMC","2GT":"GMC","3GT":"GMC",
  "1FA":"Ford","1FB":"Ford","1FC":"Ford","1FD":"Ford","1FM":"Ford",
  "2FA":"Ford","3FA":"Ford","WF0":"Ford",
  "1C3":"Chrysler","2C3":"Chrysler","3C3":"Chrysler",
  "1C6":"RAM","2C6":"RAM","3C6":"RAM",
  "1J4":"Jeep","1C4":"Jeep","2C4":"Jeep","3C4":"Jeep",
  "1LN":"LINCOLN","5LM":"LINCOLN","2LN":"LINCOLN",
  "1N4":"Nissan","1N6":"Nissan","3N1":"Nissan","5N1":"Nissan",
  "1HG":"Honda","2HG":"Honda",
  "1VW":"Volkswagen","3VW":"Volkswagen",
  "4JG":"Mercedes",
  "5UX":"BMW","4US":"BMW",
  "5XY":"KIA",
  "9BW":"Volkswagen",
  "JTE":"Toyota","JTD":"Toyota","JT2":"Toyota","JT3":"Toyota","JT4":"Toyota",
  "JTH":"Lexus","JTJ":"Lexus","JT8":"Lexus",
  "JHM":"Honda","JHL":"Honda",
  "JM1":"Mazda","JM3":"Mazda",
  "JA3":"Mitsubishi","JA4":"Mitsubishi","JMB":"Mitsubishi",
  "JN1":"Nissan","JN8":"Nissan",
  "KMH":"Hyundai","KM8":"Hyundai","TMA":"Hyundai",
  "KNA":"KIA","KND":"KIA","KNM":"KIA",
  "KMT":"Genesis",
  "KPT":"Ssang Young",
  "XTA":"LADA",
  "YV1":"Volvo","YV4":"Volvo","LYV":"Volvo",
  "SJK":"Infiniti",
};

const REPORT_CSS = `
@page { size: A4; margin: 12mm 10mm 14mm; }

/* reset / base */
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Arial;
  color: #0f172a;
  background: #fff;
  font-size: 12px;
  line-height: 1.5;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* layout */
.container { max-width: 820px; margin: 0 auto; }

/* header */
.title {
  margin: 8px 0 2px;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: .2px;
}
.meta { display: flex; flex-wrap: wrap; gap: 10px; color: #475569; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }

/* hero image */
.hero { margin: 10px 0; }
.hero .imgwrap { border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
.hero img { width: 100%; height: 260px; object-fit: cover; display: block; }
.brand { float: right; margin: 4px 0 0 10px; text-decoration: none; }
.brand img { height: 48px; display: block; }
.brand .logo-text { font-weight: 800; letter-spacing: .5px; color: #0f172a; }

/* section */
.section { display: flex; align-items: center; gap: 8px; margin: 14px 0 8px; }
.section .bar { width: 5px; height: 14px; background: #ff7a00; border-radius: 3px; }
.section h2 {
  margin: 0;
  font-size: 13px;
  letter-spacing: .02em;
  text-transform: uppercase;
  color: #334155;
}

/* cards / common */
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  margin: 8px 0;
}

/* info grids */
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.kv {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 5px 14px;
}
.k { color: #64748b; }
.v { color: #0f172a; }
.small { color: #64748b; font-size: 11px; }

/* KPI blocks (cover) */
.cover {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 8px 0 4px;
}
.kpi {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 10px 8px;
  background: #f8fafc;
}
.kpi-h { font-weight: 800; font-size: 12.5px; margin: 0 0 6px; }
.kpi.bad  { background: #fef2f2; border-color: #fecaca; }
.kpi.warn { background: #fffbeb; border-color: #fde68a; }
.kpi.ok   { background: #ecfdf3; border-color: #bbf7d0; }
.kpi ul { margin: 0; padding-left: 16px; }

/* status tiles */
.tiles {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
.tile {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  background: #ffffff;
}
.tile .tl {
  font-size: 11px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.tile .tv { font-size: 14px; font-weight: 800; }
.tile.ok   { background: #ecfdf3; border-color: #bbf7d0; }
.tile.bad  { background: #fef2f2; border-color: #fecaca; }
.tile.warn { background: #fffbeb; border-color: #fde68a; }

/* table */
.tbl { width: 100%; border-collapse: collapse; table-layout: fixed; }
.tbl th, .tbl td { border: 1px solid #e2e8f0; padding: 6px 8px; vertical-align: top; }
.tbl th { background: #f8fafc; text-align: left; color: #334155; }
.tbl td.center { text-align: center; }
/* перенос длинных ссылок/текстов */
.tbl td.wrap { white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere; }
.tbl td.url { word-break: break-all; overflow-wrap: anywhere; font-size: 11px; }
.tbl.offers th:nth-child(4), .tbl.offers td:nth-child(4) { width: 15%; }
.tbl.offers th:nth-child(5), .tbl.offers td:nth-child(5) { width: 13%; }

/* accident card */
.acc {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px;
  margin: 8px 0;
  background: #fff;
}
.acc h3 { margin: 0 0 6px; font-size: 13.5px; }
.acc .grid {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 6px 12px;
}
.schema { width: 120px; height: 64px; object-fit: contain; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; }

/* mini cards grid */
.eaisto-list, .osago-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}
.mini-card {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px;
  background: #fff;
}

/* photos (big, one per row) */
.photos { display: flex; flex-direction: column; gap: 10px; }
.photo img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

/* notes/footer */
.note {
  padding: 8px;
  border: 1px dashed #e2e8f0;
  border-radius: 10px;
  background: #fcfcfd;
  color: #64748b;
}
.footer { color: #64748b; font-size: 10px; margin: 10px 0; }
.spacer { height: 6px; }

/* print rules */
@media print {
  .card, .acc, .mini-card, .photo, .hero .imgwrap { page-break-inside: avoid; break-inside: avoid; }
  table, tr, td, th { page-break-inside: avoid; break-inside: avoid; }
  .photo { page-break-before: always; }
}
`;


/** Handlebars-шаблон HTML под макет «AVinfoBot» */
const REPORT_HBS = `
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>{{title}}</title>
    <style>${REPORT_CSS}</style>
  </head>
  <body>
    <div class="container">

      <a class="brand" href="https://unityauto.ru/" target="_blank" rel="noopener">
        <img src="{{brandLogo}}" alt="UNITY AUTO" />
      </a>

      <!-- Заголовок -->
      <div class="title">Отчёт по VIN: <span class="mono">{{vin}}</span></div>
      <div class="meta">
        <div>Дата отчёта: {{reportDate}}</div>
        <div>№ отчёта: {{reportNumber}}</div>
        {{#if region}}<div>Регион госномера: {{region}}</div>{{/if}}
      </div>

      {{#if hero}}
      <div class="hero">
        <div class="imgwrap">
          <img src="{{hero}}" alt="Главное фото" />
        </div>
      </div>
      {{/if}}

      <!-- ОБЛОЖКА: 3 сводных блока -->
      <div class="cover">
        <div class="kpi bad">
          <div class="kpi-h">Недостатки:</div>
          <ul>
            <li>ДТП — {{#if dtp.length}}есть ({{dtp.length}}){{else}}{{#if DtpCount}}{{DtpCount}}{{else}}нет{{/if}}{{/if}}</li>
            <li>Ограничения — {{#if restrict.totalRows}}{{restrict.totalRows}}{{else}}{{#if HasRestrict}}есть{{else}}0{{/if}}{{/if}}</li>
            <li>Розыск — {{#if search.rowsCount}}{{search.rowsCount}}{{else}}0{{/if}}</li>
          </ul>
        </div>
        <div class="kpi warn">
          <div class="kpi-h">Обратить внимание:</div>
          <ul>
            <li>Пробег менялся — {{yesno car.mileageChanged}}</li>
            <li>Получены все данные — {{yesno restrict.notAllInverse}}</li>
          </ul>
        </div>
        <div class="kpi ok">
          <div class="kpi-h">Плюсы / прочее:</div>
          <ul>
            <li>Периодов владения — {{#if ownership.length}}{{ownership.length}}{{else}}{{GidbbRegHistory.OwnershipPeriodCount}}{{/if}}</li>
            <li>Последний пробег — {{#if car.lastMileage}}{{car.lastMileage}}{{else}}{{Probeg}}{{/if}}</li>
            <li>ЕАИСТО — {{#if eaisto.length}}{{eaisto.length}}{{else}}{{#if EaistoList.length}}{{EaistoList.length}}{{else}}0{{/if}}{{/if}}</li>
            <li>ОСАГО — {{#if osago.policies.length}}{{osago.policies.length}}{{else}}{{#if OsagoData.PoliceList.length}}{{OsagoData.PoliceList.length}}{{else}}0{{/if}}{{/if}}</li>
          </ul>
        </div>
      </div>

      <!-- Плитки статусов -->
      <div class="section"><div class="bar"></div><h2>СТАТУСЫ</h2></div>
      <div class="tiles">
        <div class="tile {{#if zalog.rows.length}}bad{{else}}{{#if ZalogCount}}bad{{else}}ok{{/if}}{{/if}}">
          <div class="tl">Реестр залогов</div>
          <div class="tv">
            {{#if zalog.rows.length}}
              В залоге ({{zalog.rows.length}})
            {{else}}
              {{#if ZalogCount}}В залоге ({{ZalogCount}}){{else}}Не в залоге{{/if}}
            {{/if}}
          </div>
        </div>
        <div class="tile {{#if flags.carsharing}}warn{{else}}{{#if UsedInCarsharing}}warn{{else}}ok{{/if}}{{/if}}">
          <div class="tl">Каршеринг</div>
          <div class="tv">{{#if flags.carsharing}}Обнаружен{{else}}{{#if UsedInCarsharing}}Обнаружен{{else}}Не использовался{{/if}}{{/if}}</div>
        </div>
        <div class="tile {{#if flags.taxi}}warn{{else}}{{#if HasTaxi}}warn{{else}}ok{{/if}}{{/if}}">
          <div class="tl">Такси</div>
          <div class="tv">{{#if flags.taxi}}Обнаружено{{else}}{{#if HasTaxi}}Обнаружено{{else}}Не использовался{{/if}}{{/if}}</div>
        </div>
        <div class="tile {{#if flags.fines}}warn{{else}}{{#if HasFine}}warn{{else}}ok{{/if}}{{/if}}">
          <div class="tl">Штрафы</div>
          <div class="tv">{{#if flags.fines}}Есть{{else}}{{#if HasFine}}Есть{{else}}Отсутствуют{{/if}}{{/if}}</div>
        </div>
        <div class="tile">
          <div class="tl">Среднерыночная</div>
          <div class="tv">
            {{#if avg}}~{{avg.avg}} ₽ <span class="small">({{avg.min}}–{{avg.max}} ₽)</span>
            {{else}}{{#if AvgMarket}}~{{AvgMarket.PriceAvg}} ₽ <span class="small">({{AvgMarket.PriceMin}}–{{AvgMarket.PriceMax}} ₽)</span>{{else}}—{{/if}}{{/if}}
          </div>
        </div>
      </div>

      <!-- Базовая информация -->
      <div class="section"><div class="bar"></div><h2>БАЗОВАЯ ИНФОРМАЦИЯ</h2></div>
      <div class="card info-grid">
        <div class="kv">
          <div class="k">Марка/модель</div><div class="v">{{#if car.marka}}{{car.marka}} {{car.model}}{{else}}{{CarInfo.Marka}} {{CarInfo.Model}}{{/if}}</div>
          <div class="k">Поколение</div><div class="v">{{car.gen}}{{#if GidbbRegHistory.TechParams.Generation}}{{#if car.gen}}, {{/if}}{{GidbbRegHistory.TechParams.Generation}}{{/if}}</div>
          <div class="k">Категория ТС</div><div class="v">{{#if car.category}}{{car.category}}{{else}}{{GidbbRegHistory.CategoryTs}}{{/if}}</div>
          <div class="k">Кузов</div><div class="v">{{#if car.bodyNumber}}{{car.bodyNumber}}{{else}}{{GidbbRegHistory.BodyNumber}}{{/if}}</div>
          <div class="k">VIN</div><div class="v mono">{{vin}}</div>
          <div class="k">Цвет</div><div class="v">{{#if car.color}}{{car.color}}{{else}}{{GidbbRegHistory.Color}}{{/if}}</div>
          <div class="k">Топливо</div><div class="v">{{#if car.fuel}}{{car.fuel}}{{else}}{{GidbbRegHistory.TechParams.EngineType}}{{/if}}</div>
          <div class="k">Привод</div><div class="v">{{#if car.drive}}{{car.drive}}{{else}}{{GidbbRegHistory.TechParams.GearType}}{{/if}}</div>
        </div>
        <div class="kv">
          <div class="k">КПП</div><div class="v">{{#if car.transmission}}{{car.transmission}}{{else}}{{GidbbRegHistory.TechParams.Transmission}}{{/if}}</div>
          <div class="k">Объём / мощность</div><div class="v">{{#if car.volume}}{{car.volume}} см³ • {{car.power}}{{else}}{{GidbbRegHistory.EngineVolume}} см³ • {{GidbbRegHistory.Power}}{{/if}}</div>
          <div class="k">Эко-класс</div><div class="v">{{#if car.eco}}{{car.eco}}{{else}}{{GidbbRegHistory.Eco}}{{/if}}</div>
          <div class="k">Масса макс / снаряж.</div><div class="v">{{#if car.maxMass}}{{car.maxMass}} / {{car.curbMass}}{{else}}{{GidbbRegHistory.Maxmass}} / {{GidbbRegHistory.Unloadedmass}}{{/if}}</div>
          <div class="k">Статус регистрации</div><div class="v">{{#if car.status}}{{car.status}}{{else}}{{GidbbRegHistory.Status}}{{/if}}</div>
          {{#if gosnumbers.length}}
            <div class="k">Госномер(а)</div>
            <div class="v">{{#each gosnumbers}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}</div>
          {{else}}
            {{#if GosnumberList.length}}
              <div class="k">Госномер(а)</div>
              <div class="v">{{#each GosnumberList}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}</div>
            {{/if}}
          {{/if}}
          <div class="k">ПТС/СТС</div><div class="v">{{#if car.vehiclePassportNumber}}{{car.vehiclePassportNumber}}{{else}}—{{/if}}</div>
        </div>
      </div>

      <!-- Владение -->
      <div class="section"><div class="bar"></div><h2>ПЕРИОДЫ ВЛАДЕНИЯ</h2></div>
      <div class="card">
        {{#if ownership.length}}
          {{#each ownership}}
            <div class="mini-card" style="margin-bottom:8px">
              <div class="kv">
                <div class="k">Тип владельца</div><div class="v">{{personType}}</div>
                <div class="k">Период</div><div class="v">{{startDate}} — {{finishDate}}</div>
                <div class="k">Длительность</div><div class="v">{{ownerTime}}</div>
                <div class="k">Регион</div><div class="v">{{region}}</div>
                <div class="k">ДТП</div><div class="v">{{dtpCount}}</div>
              </div>
            </div>
          {{/each}}
        {{else}}
          {{#if GidbbRegHistory.OwnershipPeriods.length}}
            {{#each GidbbRegHistory.OwnershipPeriods}}
              <div class="mini-card" style="margin-bottom:8px">
                <div class="kv">
                  <div class="k">Тип владельца</div><div class="v">{{PersonType}}</div>
                  <div class="k">Период</div><div class="v">{{StartDate}} — {{FinishDate}}</div>
                  <div class="k">Длительность</div><div class="v">{{OwnerTime}}</div>
                  <div class="k">Регион</div><div class="v">{{Region}}</div>
                  <div class="k">ДТП</div><div class="v">{{DtpCount}}</div>
                </div>
              </div>
            {{/each}}
          {{else}}
            <div class="small">Нет данных</div>
          {{/if}}
        {{/if}}
      </div>

      <!-- Пробег -->
      <div class="section"><div class="bar"></div><h2>ПРОБЕГ АВТОМОБИЛЯ</h2></div>
      <div class="card">
        <table class="tbl">
          <thead><tr><th>Дата</th><th>Пробег</th><th>Источник</th></tr></thead>
          <tbody>
            {{#if mileage.length}}
              {{#each mileage}}<tr><td>{{date}}</td><td>{{value}}</td><td>{{source}}</td></tr>{{/each}}
            {{else}}
              {{#if ProbegList.length}}
                {{#each ProbegList}}<tr><td>{{Date}}</td><td>{{Probeg}}</td><td>{{Source}}</td></tr>{{/each}}
              {{else}}
                <tr><td colspan="3">Нет данных</td></tr>
              {{/if}}
            {{/if}}
          </tbody>
        </table>
        <div class="small" style="margin-top:6px">Информация о пробегах поступает из ЕАИСТО, объявлений и историй обслуживания.</div>
      </div>

      <!-- ДТП: карточки -->
      <div class="section"><div class="bar"></div><h2>ДАННЫЕ ОБ УЧАСТИИ В ДТП</h2></div>
      {{#if dtp.length}}
        {{#each dtp}}
          <div class="acc">
            <h3>№ {{number}} — {{type}}</h3>
            <div class="grid">
              <div class="k">Дата</div><div class="v">{{date}}</div>
              <div class="k">Регион</div><div class="v">{{region}}</div>
              <div class="k">Место</div><div class="v">{{place}}</div>
              <div class="k">Сост. ТС</div><div class="v">{{state}}</div>
              <div class="k">Участники</div><div class="v">{{participants}}</div>
              <div class="k">Схема</div><div class="v">{{#if schemaUrl}}<img class="schema" src="{{schemaUrl}}" alt="Схема ДТП" />{{else}}—{{/if}}</div>
            </div>
          </div>
        {{/each}}
      {{else}}
        {{#if GibddDtp.Accindents.length}}
          {{#each GibddDtp.Accindents}}
            <div class="acc">
              <h3>№ {{Number}} — {{Type}}</h3>
              <div class="grid">
                <div class="k">Дата</div><div class="v">{{Date}}</div>
                <div class="k">Регион</div><div class="v">{{Region}}</div>
                <div class="k">Место</div><div class="v">{{AccidentPlace}}</div>
                <div class="k">Сост. ТС</div><div class="v">{{State}}</div>
                <div class="k">Схема</div><div class="v">{{#if SchemaPicUrl}}<img class="schema" src="{{SchemaPicUrl}}" alt="Схема ДТП" />{{else}}—{{/if}}</div>
              </div>
            </div>
          {{/each}}
        {{else}}
          <div class="card"><div class="small">Нет записей о ДТП</div></div>
        {{/if}}
      {{/if}}

      <!-- Участники ДТП (подробно из ГИБДД) -->
      {{#if GibddDtp.AccindentsData.length}}
      <div class="card">
        <div class="section" style="margin-top:0"><div class="bar"></div><h2>УЧАСТНИКИ ДТП</h2></div>
        <table class="tbl">
          <thead><tr><th>№ ДТП</th><th>VIN участника</th><th>Повреждения</th><th>SrId</th><th>Проверен</th></tr></thead>
          <tbody>
            {{#each GibddDtp.AccindentsData}}
              {{#each Participants}}
                <tr>
                  <td>{{../Number}}</td>
                  <td class="mono">{{Vin}}</td>
                  <td class="wrap">{{#if DamagePoints.length}}{{#each DamagePoints}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}—{{/if}}</td>
                  <td class="mono">{{SrId}}</td>
                  <td class="center">{{yesno IsCheck}}</td>
                </tr>
              {{/each}}
            {{/each}}
          </tbody>
        </table>
      </div>
      {{/if}}

      {{#if OtherSourceDtp.length}}
        <div class="small">Другие источники: {{#each OtherSourceDtp}}[{{Vin}} / {{Gosnumber}} / {{Date}}] {{/each}}</div>
      {{/if}}

      <!-- Сведения ГИБДД -->
      {{#if GibddList.length}}
      <div class="section"><div class="bar"></div><h2>СВЕДЕНИЯ ГИБДД</h2></div>
      <div class="card">
        <table class="tbl">
          <thead><tr><th>Госномер</th><th>ТС</th><th>Владелец</th><th>VIN</th><th>Дата операции</th></tr></thead>
          <tbody>
            {{#each GibddList}}<tr>
              <td>{{Gosnomer}}</td>
              <td>{{Car}}</td>
              <td>{{OwnerN}} {{OwnerF}} {{OwnerO}}</td>
              <td class="mono">{{Vin}}</td>
              <td>{{DateOperation}}</td>
            </tr>{{/each}}
          </tbody>
        </table>
        <div class="small">Всего записей: {{GibddListTotal}}</div>
      </div>
      {{/if}}

      <!-- ЕАИСТО -->
      <div class="section"><div class="bar"></div><h2>ПРОЙДЕННЫЕ ТЕХОСМОТРЫ (ЕАИСТО)</h2></div>
      <div class="card">
        <div class="eaisto-list">
          {{#if eaisto.length}}
            {{#each eaisto}}
              <div class="mini-card">
                <div class="kv">
                  <div class="k">Дата</div><div class="v">{{date}}</div>
                  <div class="k">Действует до</div><div class="v">{{expire}}</div>
                  <div class="k">Пробег</div><div class="v">{{probeg}}</div>
                  <div class="k">Документ</div><div class="v mono">{{doc}}</div>
                  <div class="k">Госномер</div><div class="v">{{gosnumber}}</div>
                </div>
              </div>
            {{/each}}
          {{else}}
            {{#if EaistoList.length}}
              {{#each EaistoList}}
                <div class="mini-card">
                  <div class="kv">
                    <div class="k">Дата</div><div class="v">{{Date}}</div>
                    <div class="k">Действует до</div><div class="v">{{DateExpire}}</div>
                    <div class="k">Пробег</div><div class="v">{{Probeg}}</div>
                    <div class="k">Документ</div><div class="v mono">{{DocNumber}}</div>
                    <div class="k">Госномер</div><div class="v">{{Gosnumber}}</div>
                  </div>
                </div>
              {{/each}}
            {{else}}
              <div class="small">Нет данных</div>
            {{/if}}
          {{/if}}
        </div>
      </div>

      <!-- Госномера и СТС -->
      {{#if GosnumberData.GosnumberData.GosnumberList.length}}
      <div class="section"><div class="bar"></div><h2>ГОСНОМЕРА И СТС</h2></div>
      <div class="card">
        <table class="tbl">
          <thead><tr><th>Госномер</th><th>СТС (список)</th><th>FRI</th></tr></thead>
          <tbody>
            {{#each GosnumberData.GosnumberData.GosnumberList}}
              <tr>
                <td>{{Gosnumber}}</td>
                <td class="wrap">
                  {{#if StsList.length}}{{#each StsList}}<span class="mono">{{this}}</span>{{#unless @last}}, {{/unless}}{{/each}}{{else}}—{{/if}}
                </td>
                <td>{{FriId}}</td>
              </tr>
            {{/each}}
          </tbody>
        </table>
      </div>
      {{/if}}

      <!-- ОСАГО -->
      <div class="section"><div class="bar"></div><h2>ПОЛИС ОСАГО</h2></div>
      <div class="card">
        <div class="small">Последний запрос: {{#if osago.lastReq}}{{osago.lastReq}}{{else}}{{OsagoRequestDate}}{{/if}}</div>

        <!-- список полисов -->
        <div class="osago-list" style="margin-top:6px">
          {{#if osago.policies.length}}
            {{#each osago.policies}}
              <div class="mini-card">
                <div class="kv">
                  <div class="k">Компания</div><div class="v">{{company}}</div>
                  <div class="k">Серия</div><div class="v">{{serial}}</div>
                  <div class="k">Номер</div><div class="v mono">{{number}}</div>
                  <div class="k">Статус/Период</div><div class="v">{{status}} / {{period}}</div>
                  <div class="k">Регзнак</div><div class="v">{{plate}}</div>
                </div>
              </div>
            {{/each}}
          {{else}}
            {{#if OsagoData.PoliceList.length}}
              {{#each OsagoData.PoliceList}}
                <div class="mini-card">
                  <div class="kv">
                    <div class="k">Компания</div><div class="v">{{CompanyName}}</div>
                    <div class="k">Серия</div><div class="v">{{Serial}}</div>
                    <div class="k">Номер</div><div class="v mono">{{Number}}</div>
                    <div class="k">Статус/Период</div><div class="v">{{DogovorState}} / {{DogovorActivPeriod}}</div>
                  </div>
                  {{#if CarInfo.length}}
                  <div class="kv" style="margin-top:6px">
                    <div class="k">Данные ТС из полиса</div>
                    <div class="v">
                      {{#each CarInfo}}{{Name}}: {{Value}}{{#unless @last}}; {{/unless}}{{/each}}
                    </div>
                  </div>
                  {{/if}}
                </div>
              {{/each}}
            {{else}}
              <div class="small">Нет данных</div>
            {{/if}}
          {{/if}}
        </div>

        <!-- тех. идентификаторы -->
        {{#if GosnumberData.OsagoData}}
        <div class="kv" style="margin-top:8px">
          <div class="k">AutoinsId</div><div class="v mono">{{GosnumberData.OsagoData.AutoinsId}}</div>
          <div class="k">RSA Ids</div>
          <div class="v mono">
            {{#if GosnumberData.OsagoData.RsaIds.length}}{{#each GosnumberData.OsagoData.RsaIds}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}—{{/if}}
          </div>
        </div>
        {{/if}}
      </div>

      <!-- Розыск / Ограничения / Залог (подробности) -->
      <div class="section"><div class="bar"></div><h2>РОЗЫСК / ОГРАНИЧЕНИЯ / ЗАЛОГ</h2></div>
      <div class="card">
        <div class="kv">
          <div class="k">Розыск (строк)</div><div class="v">{{search.rowsCount}}</div>
          <div class="k">Ограничения (всего/сумма)</div><div class="v">{{restrict.totalRows}} / {{restrict.totalSumm}}</div>
          <div class="k">Сост. реестра залогов</div><div class="v">{{#if zalog.registrState}}{{zalog.registrState}}{{else}}{{ZalogRegistrState}}{{/if}}</div>
          <div class="k">Предыдущие</div><div class="v">{{#if zalog.prevDate}}{{zalog.prevDate}}{{else}}{{RequestDate.Zalog.ZalogPreviosRequestDate}}{{/if}}</div>
        </div>

        <!-- таблица залогов из GND -->
        {{#if GosnumberData.ZalogData.ListZalog.length}}
        <table class="tbl" style="margin-top:8px">
          <thead><tr><th>#</th><th>Id</th><th>Тип</th></tr></thead>
          <tbody>
            {{#each GosnumberData.ZalogData.ListZalog}}
              <tr><td class="center">{{@index}}</td><td class="mono">{{Id}}</td><td>{{Type}}</td></tr>
            {{/each}}
          </tbody>
        </table>
        {{else}}
          {{#if zalog.rows.length}}
            <table class="tbl" style="margin-top:8px">
              <thead><tr><th>#</th><th>Id</th><th>Тип</th></tr></thead>
              <tbody>{{#each zalog.rows}}<tr><td class="center">{{@index}}</td><td class="mono">{{Id}}</td><td>{{Type}}</td></tr>{{/each}}</tbody>
            </table>
          {{else}}
            <div class="small" style="margin-top:6px">Записей о залоге не найдено</div>
          {{/if}}
        {{/if}}
      </div>

      <!-- Рынок (с переносом длинных ссылок) -->
      {{#if avg}}
      <div class="section"><div class="bar"></div><h2>СРЕДНЕРЫНОЧНАЯ СТОИМОСТЬ</h2></div>
      <div class="card">
        <div class="kv">
          <div class="k">Мин</div><div class="v">{{avg.min}} ₽</div>
          <div class="k">Средняя</div><div class="v"><b>{{avg.avg}} ₽</b></div>
          <div class="k">Макс</div><div class="v">{{avg.max}} ₽</div>
          <div class="k">Средний пробег</div><div class="v">{{avg.dist}} км</div>
          <div class="k">Модель/Год</div><div class="v">{{avg.meta}}</div>
        </div>
        <div class="spacer"></div>
        <table class="tbl offers">
          <thead>
            <tr><th>Дата</th><th>Марка/модель</th><th>Год</th><th>Регион</th><th>Город</th><th>Пробег</th><th>Владельцев</th><th>Цена</th><th>Источник</th></tr>
          </thead>
          <tbody>
            {{#if offers.length}}
              {{#each offers}}
                <tr>
                  <td>{{date}}</td>
                  <td>{{marka}} {{model}}</td>
                  <td>{{year}}</td>
                  <td>{{region}}</td>
                  <td>{{city}}</td>
                  <td>{{distance}}</td>
                  <td>{{ownerCount}}</td>
                  <td>{{price}}</td>
                  <td class="url">{{source}}</td>
                </tr>
              {{/each}}
            {{else}}
              <tr><td colspan="9">Нет объявлений</td></tr>
            {{/if}}
          </tbody>
        </table>
      </div>
      {{else}}
        {{#if AvgMarket}}
        <div class="section"><div class="bar"></div><h2>СРЕДНЕРЫНОЧНАЯ СТОИМОСТЬ</h2></div>
        <div class="card">
          <div class="kv">
            <div class="k">Мин</div><div class="v">{{AvgMarket.PriceMin}} ₽</div>
            <div class="k">Средняя</div><div class="v"><b>{{AvgMarket.PriceAvg}} ₽</b></div>
            <div class="k">Макс</div><div class="v">{{AvgMarket.PriceMax}} ₽</div>
            <div class="k">Средний пробег</div><div class="v">{{AvgMarket.DistanceAvg}} км</div>
            <div class="k">Модель/Год</div><div class="v">{{AvgMarket.Marka}} {{AvgMarket.Model}}, {{AvgMarket.Year}}</div>
          </div>
          <div class="spacer"></div>
          <table class="tbl offers">
            <thead>
              <tr><th>Дата</th><th>Марка/модель</th><th>Год</th><th>Регион</th><th>Город</th><th>Пробег</th><th>Владельцев</th><th>Цена</th><th>Источник</th></tr>
            </thead>
            <tbody>
              {{#if AvgMarket.Offers.length}}
                {{#each AvgMarket.Offers}}
                  <tr>
                    <td>{{CreDate}}</td>
                    <td>{{Marka}} {{Model}}</td>
                    <td>{{Year}}</td>
                    <td>{{Region}}</td>
                    <td>{{City}}</td>
                    <td>{{Distance}}</td>
                    <td>{{OwnerCount}}</td>
                    <td>{{Price}}</td>
                    <td class="url">{{Url}}</td>
                  </tr>
                {{/each}}
              {{else}}
                <tr><td colspan="9">Нет объявлений</td></tr>
              {{/if}}
            </tbody>
          </table>
        </div>
        {{/if}}
      {{/if}}

      <!-- VIN-параметры -->
      {{#if vinData.length}}
      <div class="section"><div class="bar"></div><h2>ДАННЫЕ ПО VIN</h2></div>
      <div class="card">
        <div class="kv">
          {{#each vinData}}
            <div class="k">{{Key}}</div>
            <div class="v">{{Value}}</div>
          {{/each}}
        </div>
      </div>
      {{else}}
        {{#if VinData.length}}
        <div class="section"><div class="bar"></div><h2>ДАННЫЕ ПО VIN</h2></div>
        <div class="card">
          <div class="kv">
            {{#each VinData}}
              <div class="k">{{Key}}</div>
              <div class="v">{{Value}}</div>
            {{/each}}
          </div>
        </div>
        {{/if}}
      {{/if}}

      <!-- ЭПТС и прочие данные -->
      <div class="section"><div class="bar"></div><h2>ЭПТС И ПРОЧИЕ ДАННЫЕ</h2></div>
      <div class="card">
        <div class="kv">
          <div class="k">ЭПТС №</div><div class="v">{{#if elpts}}{{elpts}}{{else}}{{Elpts.Number}}{{/if}}</div>
          <div class="k">Статус</div><div class="v">{{Elpts.Status}}</div>
          <div class="k">Оплата</div><div class="v">{{Elpts.PaymentInfo}}</div>
          <div class="k">Выпуск</div><div class="v">{{Elpts.ReleaseDetails}}</div>
          <div class="k">Огр. таможни</div><div class="v">{{Elpts.CustomsRestrictions}}</div>
          <div class="k">Прочие огр.</div><div class="v">{{Elpts.OtherRestrictions}}</div>
          <div class="k">Последнее действие</div><div class="v">{{Elpts.LastActionInfo}}</div>
          <div class="k">Штрафы (изображения)</div><div class="v">{{finesImagesInfo}}</div>
          <div class="k">Сервисы ТО/ремонтов</div><div class="v">{{servicesInfo}}</div>
          <div class="k">Прочее</div><div class="v">{{miscInfo}}</div>
        </div>
      </div>

      <!-- Отзывные кампании -->
      <div class="section"><div class="bar"></div><h2>ОТЗЫВНЫЕ КАМПАНИИ</h2></div>
      <div class="card">
        <div class="kv">
          <div class="k">Найдено</div><div class="v">{{#if Recalls.Total}}{{Recalls.Total}}{{else}}0{{/if}}</div>
        </div>
      </div>

      <!-- Техническая информация / статусы сервисов -->
      <div class="section"><div class="bar"></div><h2>ТЕХНИЧЕСКАЯ ИНФОРМАЦИЯ</h2></div>
      <div class="card">
        <div class="kv">
          <div class="k">ID задачи</div><div class="v mono">{{#if task.id}}{{task.id}}{{else}}{{Task.ID}}{{/if}}</div>
          <div class="k">Генерация</div>
          <div class="v small">{{#if task.start}}{{task.start}}{{else}}{{Task.StartGenerationDate}}{{/if}} → {{#if task.complete}}{{task.complete}}{{else}}{{Task.CompleteGenerationDate}}{{/if}}</div>
          <div class="k">Готовность</div><div class="v">{{#if Task.Percent}}{{Task.Percent}}%{{else}}—{{/if}}</div>
        </div>

        <table class="tbl" style="margin-top:8px">
          <thead><tr><th>Сервис</th><th>Дата</th><th>Попыток</th><th>Отменён</th><th>Завершён</th><th>Оффлайн</th></tr></thead>
          <tbody>
            {{#if task.statusServices.length}}
              {{#each task.statusServices}}
                <tr><td>{{ServiceName}}</td><td>{{date}}</td><td class="center">{{Attempts}}</td><td class="center">{{yesno IsCancel}}</td><td class="center">{{yesno IsComplete}}</td><td class="center">{{yesno IsOffline}}</td></tr>
              {{/each}}
            {{else}}
              {{#if Task.StatusServices.length}}
                {{#each Task.StatusServices}}
                  <tr><td>{{ServiceName}}</td><td>{{Date}}</td><td class="center">{{Attempts}}</td><td class="center">{{yesno IsCancel}}</td><td class="center">{{yesno IsComplete}}</td><td class="center">{{yesno IsOffline}}</td></tr>
                {{/each}}
              {{/if}}
            {{/if}}
          </tbody>
        </table>
      </div>

      <!-- Где находится VIN (подсказка) -->
      {{#if WhereVin.Url}}
      <div class="note">Где находится VIN: {{WhereVin.Title}} — {{WhereVin.Url}} (поколение: {{WhereVin.Generation}})</div>
      {{/if}}

      <!-- Фото на отдельных страницах -->
      {{#if photos.length}}
      <div class="section"><div class="bar"></div><h2>ФОТО АВТОМОБИЛЯ</h2></div>
      <div class="photos">
        {{#each photos}}<div class="photo"><img src="{{Url}}" alt="{{Caption}}" /></div>{{/each}}
      </div>
      {{else}}
        {{#if ImageList.length}}
        <div class="section"><div class="bar"></div><h2>ФОТО АВТОМОБИЛЯ</h2></div>
        <div class="photos">
          {{#each ImageList}}<div class="photo"><img src="{{Url}}" alt="{{Caption}}" /></div>{{/each}}
        </div>
        {{/if}}
      {{/if}}

      <div class="footer">
      </div>

    </div>
  </body>
</html>
`;
require('dotenv').config();
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express');
const multer = require('multer');
const { Telegraf, Markup } = require('telegraf');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');

// === YooKassa
const { v4: uuidv4 } = require('uuid');
const YooKassa = require('yookassa');

/* ========================== ENV / CONST ========================== */
const BOT_TOKEN = process.env.BOT_TOKEN;
const API_ASSIST_KEY = process.env.API_ASSIST_KEY || 'fa641774a26557c69c96e06bc334b27f';
const API_ASSIST_BASE = 'https://service.api-assist.com';

const VAGVIN_API_KEY = process.env.VAGVIN_API_KEY || '9eEHMfU018idwD3Cexfo';
const VAGVIN_API_URL = process.env.VAGVIN_API_URL || 'http://vagvin.ru//api/process';
const VAGVIN_EMAIL = process.env.VAGVIN_EMAIL || '';
const VAGVIN_LANG = process.env.VAGVIN_LANG || 'RU';

const WEBHOOK_PUBLIC_BASE = process.env.WEBHOOK_PUBLIC_BASE || '';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'please_change_me';

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const USERS_FILE = path.resolve(__dirname, 'users.json');
const VAGVIN_JOBS_FILE = path.resolve(__dirname, 'vagvin-jobs.json');
const PAYMENTS_STATE_FILE = path.resolve(__dirname, 'ykc-payments.json');

/* === FREE RF CHECK (1 раз/сутки при подписке) === */
const RF_FREE_FILE = path.resolve(__dirname, 'rf-free-usage.json');
const RF_FREE_COOLDOWN_MS = Number(process.env.RF_FREE_COOLDOWN_MS || 24 * 60 * 60 * 1000); // 24 часа
// Канал с подпиской
const RF_SUBS_CHANNEL =
  process.env.FREE_RF_CHANNEL_USERNAME ||
  (() => {
    const raw = 'https://t.me/chan122334';
    const m = raw.match(/t\.me\/([A-Za-z0-9_]+)/);
    return m ? '@' + m[1] : '@chan122334';
  })();

/* === LEGAL URLs === */
const _PUBLIC_BASE = (WEBHOOK_PUBLIC_BASE || '').replace(/\/+$/, '');
const LEGAL_PRIVACY_URL =
  process.env.LEGAL_PRIVACY_URL ||
  (_PUBLIC_BASE ? `${_PUBLIC_BASE}/legal/privacy` : '/legal/privacy');
const LEGAL_TERMS_URL =
  process.env.LEGAL_TERMS_URL ||
  (_PUBLIC_BASE ? `${_PUBLIC_BASE}/legal/terms` : '/legal/terms');

const BRAND_LOGO_URL =
  process.env.BRAND_LOGO_URL
  || (_PUBLIC_BASE ? `${_PUBLIC_BASE}/img/unity-auto.png`
                   : `http://127.0.0.1:${PORT}/img/unity-auto.png`);

const LEGAL_PRIVACY_PDF_PATH = process.env.LEGAL_PRIVACY_PDF_PATH
  || path.join(__dirname, 'public', 'legal', 'Политика конфиденциальности.pdf');
const LEGAL_TERMS_PDF_PATH   = process.env.LEGAL_TERMS_PDF_PATH
  || path.join(__dirname, 'public', 'legal', 'Пользовательское_соглашение_Юкасса.pdf');
/* =============================================================================================================== */

if (!BOT_TOKEN) {
  console.error('Ошибка: BOT_TOKEN не задан в .env');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

bot.use((ctx, next) => {
  ctx.replyHTML = (text, extra = {}) =>
    ctx.reply(text, { parse_mode: 'HTML', disable_web_page_preview: true, ...extra });
  return next();
});

const sendHTML = (chatId, text, extra = {}) =>
  bot.telegram.sendMessage(chatId, text, { parse_mode: 'HTML', disable_web_page_preview: true, ...extra });

/* ========================== BRAND SUPPORT ROUTING ========================== */
// ВАЖНО: BRANDS_LIST и WMI_TO_BRAND уже объявлены выше в вашем коде и тут не изменяются.

// Синонимы и нормализация имён брендов к виду из BRANDS_LIST
const BRAND_SYNONYMS = new Map([
  ['LandRover', 'Land Rover'],
  ['Mercedes-Benz', 'Mercedes'],
  ['VW', 'Volkswagen'],
  ['Skoda', 'SKODA'],
  ['Seat', 'SEAT'],
  ['SsangYong', 'Ssang Young'],
  ['Ssang Yong', 'Ssang Young'],
]);
function normalizeBrand(name) {
  if (!name) return null;
  let n = String(name).trim().replace(/\s+/g, ' ');
  if (BRAND_SYNONYMS.has(n)) n = BRAND_SYNONYMS.get(n);
  const fromList = BRANDS_LIST.find(b => b.toLowerCase() === n.toLowerCase());
  return fromList || n;
}

// Поддерживаемые наборы
const SUPPORTED_EQUIPMENT = new Set([
  'Alfa Romeo','Alpine','Lamborghini','BMW','BMW ЭЛЕКТРО','BMW MOTO','Dacia','Fiat','Opel',
  'Chevrolet','Jeep','Mini','Volvo','Toyota','Lexus','Infiniti','Jaguar','Hyundai','Citroen',
  'Land Rover','KIA','Mitsubishi','Nissan','Mercedes','Ford','Renault','Peugeot','DS','Suzuki',
  'Honda','Rolls-Royce','Cadillac','GMC','LINCOLN','RAM','Genesis','Lancia','Buick','Ssang Young'
]);

const SUPPORTED_OEM_BASE = new Set([
  'Alfa Romeo','Jeep','Mazda','Dodge','Fiat','Infiniti','Jaguar','Land Rover','Lexus','Nissan',
  'Opel','Chevrolet','RAM','Toyota','Ford','Porsche','Hyundai','Genesis','Lancia','Smart',
  'Mercedes','Dacia','Renault','DS','Peugeot','Citroen'
]);
const VW_GROUP_FOR_OEM  = new Set(['Volkswagen','Audi','SEAT','SKODA','Bentley','Cupra']);
const BMW_GROUP_FOR_OEM = new Set(['BMW','BMW ЭЛЕКТРО','BMW MOTO','Rolls-Royce','Mini','Alpine']);
const SUPPORTED_OEM = new Set([...SUPPORTED_OEM_BASE, ...VW_GROUP_FOR_OEM, ...BMW_GROUP_FOR_OEM]);

const MSG_EQUIP_UNSUPPORTED = (brand) =>
  `Марка «${brand}» не поддерживается для проверки комплектации. Выберите другой вариант ниже.`;
const MSG_OEM_UNSUPPORTED = (brand) =>
  `Марка «${brand}» не поддерживается для проверки истории по дилерской базе. Выберите другой вариант ниже.`;

const OEM_DEFAULT_CMD = 'check_data_multibr_zapros';
const OEM_VW_CMD      = 'check_elsa_pro_full';
const OEM_BMW_CMD     = 'check_data_bmw_full';

function isBrandSupportedForEquipment(brand) {
  const b = normalizeBrand(brand);
  return !!b && SUPPORTED_EQUIPMENT.has(b);
}
function isBrandSupportedForOem(brand) {
  const b = normalizeBrand(brand);
  return !!b && SUPPORTED_OEM.has(b);
}
function chooseOemCommand(brand) {
  const b = normalizeBrand(brand);
  if (VW_GROUP_FOR_OEM.has(b)) return OEM_VW_CMD;
  if (BMW_GROUP_FOR_OEM.has(b)) return OEM_BMW_CMD;
  return OEM_DEFAULT_CMD;
}

const INVALID_VIN_CHARS = /[IOQ]/i;
const detectBrandFromVin = (vin) => {
  if (!vin || vin.length < 3) return null;
  if (INVALID_VIN_CHARS.test(vin)) return null;
  const wmi = vin.slice(0, 3).toUpperCase();
  const brand = normalizeBrand(WMI_TO_BRAND[wmi] || null);
  if (brand && ALLOWED_BRANDS.has(brand)) return brand;
  return null;
};

/* ========================== Helpers: logging & files ========================== */
const toStringSafe = (data) => {
  if (data == null) return '';
  if (typeof data === 'string') return data;
  try { return JSON.stringify(data); } catch { return String(data); }
};
const shorten = (data, max = 1500) => {
  const s = toStringSafe(data);
  return s.length > max ? `${s.slice(0, max)}... [truncated ${s.length - max} chars]` : s;
};

const readJsonFileSafe = async (file, fallback) => {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (e) { if (e.code === 'ENOENT') return fallback; console.error('readJsonFileSafe:', e?.message||e); return fallback; }
};
const writeJsonFileSafe = async (file, obj) => {
  try { await fs.writeFile(file, JSON.stringify(obj, null, 2), 'utf8'); }
  catch (e) { console.error('writeJsonFileSafe:', e?.message||e); }
};

const usersStore = {
  async getAll() { return readJsonFileSafe(USERS_FILE, []); },
  async setAll(arr) { return writeJsonFileSafe(USERS_FILE, arr); },
  async add(chat) {
    const arr = await this.getAll();
    if (!arr.find(x => x.id === chat.id)) {
      arr.push({ id: chat.id, type: chat.type || 'private', username: chat.username || null, addedAt: new Date().toISOString() });
      await this.setAll(arr);
    }
  }
};

const jobsStore = {
  async getAll() { return readJsonFileSafe(VAGVIN_JOBS_FILE, {}); },
  async setAll(map) { return writeJsonFileSafe(VAGVIN_JOBS_FILE, map); },
  async put(key, data) { const m = await this.getAll(); m[key] = data; await this.setAll(m); },
  async get(key) { const m = await this.getAll(); return m[key] || null; },
  async del(key) { const m = await this.getAll(); delete m[key]; await this.setAll(m); },
};

const paymentsStore = {
  async getAll() { return readJsonFileSafe(PAYMENTS_STATE_FILE, {}); },
  async setAll(map) { return writeJsonFileSafe(PAYMENTS_STATE_FILE, map); },
  async get(id) { const m = await this.getAll(); return m[id] || null; },
  async put(id, data) { const m = await this.getAll(); m[id] = data; await this.setAll(m); },
  async merge(id, patch) {
    const m = await this.getAll();
    const prev = m[id] || {};
    m[id] = { ...prev, ...patch, updatedAt: new Date().toISOString() };
    await this.setAll(m);
    return m[id];
  },
  async del(id) {
    const m = await this.getAll();
    delete m[id];
    await this.setAll(m);
  }
};

/* === Хранилище бесплатных РФ-проверок === */
const rfFreeStore = {
  async _all() { return readJsonFileSafe(RF_FREE_FILE, {}); },
  async _setAll(m) { return writeJsonFileSafe(RF_FREE_FILE, m); },
  async get(chatId) {
    const all = await this._all(); return all[String(chatId)] || null;
  },
  async setUsedNow(chatId) {
    const all = await this._all();
    all[String(chatId)] = { lastAt: Date.now() };
    await this._setAll(all);
  },
  async remainingMs(chatId) {
    const rec = await this.get(chatId);
    if (!rec || !rec.lastAt) return 0;
    const passed = Date.now() - Number(rec.lastAt || 0);
    return Math.max(0, RF_FREE_COOLDOWN_MS - passed);
  },
  async isAvailable(chatId) {
    return (await this.remainingMs(chatId)) <= 0;
  }
};

const maskKey = (key) => (!key || typeof key !== 'string')
  ? '***'
  : (key.length <= 8 ? key[0] + '***' + key[key.length - 1] : key.slice(0,4)+'...'+key.slice(-4));

const msToHuman = (ms) => {
  const s = Math.ceil(Math.max(0, ms)/1000);
  const h = Math.floor(s/3600);
  const m = Math.floor((s%3600)/60);
  if (!h && !m) return 'менее минуты';
  return [h?`${h} ч`:null, m?`${m} м`:null].filter(Boolean).join(' ');
};

/* ========================== TRONK → PDF и шаблоны ========================== */
/* ВАЖНО: REPORT_CSS и REPORT_HBS уже объявлены выше в вашем коде и тут не изменяются. */

/** helpers */
Handlebars.registerHelper('yesno', v => (v ? 'Да' : 'Нет'));

/** форматирование */
const _fmtDate = (val) => {
  if (!val || String(val).startsWith('0001-01-01')) return '—';
  const d = new Date(val); if (isNaN(d)) return String(val);
  const pad = n => String(n).padStart(2,'0');
  return `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()}${(d.getHours()+d.getMinutes()>0)?` ${pad(d.getHours())}:${pad(d.getMinutes())}`:''}`;
};
const _fmtNum = (n) => (n==null||n==='') ? '—' : (Number.isFinite(Number(n)) ? Number(n).toLocaleString('ru-RU') : String(n));
const _schemaUrlFromPoints = (points) => points ? `https://i.avinforpt.com/image/dtpdamagepoints?points=${points}&svg=1` : '';

/** Маппер TRONK JSON → контекст шаблона */
function mapTronkToTemplate(json) {
  const d = json?.Result?.data || {};
  const grh = d.GidbbRegHistory || {};
  const tech = grh.TechParams || {};
  const dtpBlock = d.GibddDtp || {};
  const avg = d.AvgMarket || {};
  const more = d.MoreData || {};
  const upd = more.UpdateBlocks || {};
  const reqDate = d.RequestDate || {};
  const restrict = d.GibddRestrict || {};
  const search = d.GibddSearch || {};

  const car = {
    marka: d.CarInfo?.Marka || '',
    model: d.CarInfo?.Model || '',
    gen: tech.Generation || d.WhereVin?.Generation || '',
    year: grh.Year || '',
    category: grh.CategoryTs || '',
    bodyNumber: grh.BodyNumber || '',
    color: grh.Color || '',
    fuel: tech.EngineType || '',
    drive: tech.GearType || '',
    transmission: tech.Transmission || '',
    power: grh.Power || '',
    volume: grh.EngineVolume || '',
    eco: grh.Eco || '',
    maxMass: grh.Maxmass || '',
    curbMass: grh.Unloadedmass || '',
    status: grh.Status || '',
    lastMileage: d.Probeg != null ? `${_fmtNum(d.Probeg)} км (${_fmtDate(d.ProbegDate)})` : '—',
    mileageChanged: !!d.ProbegChanged,
  };

  const flags = {
    hasDtp: !!d.HasDtp,
    hasRestrict: !!d.HasRestrict,
    hasZalog: !!d.ZalogRegistrState || (d.GosnumberData?.ZalogData?.ListZalog?.length > 0),
    taxi: !!(d.HasTaxi || d.HasManyTaxi),
    carsharing: !!(d.UsedInCarsharing || d.UsedInCarsharingPossibly),
    fines: !!(d.HasFine || d.HasActualFine || d.HasFsspFine || d.HasParkingFine),
  };

  const ownership = (grh.OwnershipPeriods || []).map(p => ({
    personType: p.PersonType || '—',
    startDate: _fmtDate(p.StartDate),
    finishDate: p.FinishDate && !String(p.FinishDate).startsWith('0001') ? _fmtDate(p.FinishDate) : 'по наст. время',
    ownerTime: p.OwnerTime || '—',
    region: p.Region || '—',
    dtpCount: p.DtpCount ?? '—',
  }));

  const mileage = (d.ProbegList || []).map(m => ({
    date: _fmtDate(m.Date),
    value: m.Probeg != null ? `${_fmtNum(m.Probeg)} км` : '—',
    source: ({5:'из техосмотра',3:'из объявления',7:'из сервиса/СТО'}[m.Source] || 'источник не указан')
  }));

  const accDataByNumber = new Map((dtpBlock.AccindentsData || []).map(x => [x.Number, x]));
  const dtp = (dtpBlock.Accindents || []).map(x => {
    let schemaUrl = x.SchemaPicUrl || '';
    if (!schemaUrl) {
      const ad = accDataByNumber.get(x.Number);
      const points = ad?.Participants?.[0]?.DamagePoints || [];
      schemaUrl = _schemaUrlFromPoints(points.join(''));
    }
    return {
      number: x.Number || '—',
      date: _fmtDate(x.Date),
      type: x.Type || '—',
      region: x.Region || '—',
      place: x.AccidentPlace || '—',
      state: x.State || '—',
      participants: (x.Participants || [])
        .map(p => [p.MarkaAndModel, p.Vin, p.Gosnubmer].filter(Boolean).join(' • '))
        .join('; ') || '—',
      schemaUrl
    };
  });

  const eaisto = (d.EaistoList || []).map(e => ({
    date: _fmtDate(e.Date), expire: _fmtDate(e.DateExpire),
    probeg: e.Probeg != null ? `${_fmtNum(e.Probeg)} км` : '—',
    doc: e.DocNumber || '—', gosnumber: e.Gosnumber || '—'
  }));

  const osago = {
    lastReq: _fmtDate(d.OsagoRequestDate),
    policies: (d.OsagoData?.PoliceList || []).map(p => ({
      company: p.CompanyName || '—',
      serial: p.Serial || '—',
      number: p.Number || '—',
      status: p.DogovorState || '—',
      period: p.DogovorActivPeriod || '—',
      plate: (p.CarInfo || []).find(x => (x?.Name||'').toLowerCase().includes('регистрационный'))?.Value || ''
    }))
  };

  const restrictCtx = {
    totalRows: restrict.TotalRows ?? 0,
    totalSumm: restrict.TotalSumm ?? 0,
    notAllInverse: !(restrict.NotAll ?? false)
  };
  const searchCtx = { rowsCount: (search.Rows || []).length };

  const zalogCtx = {
    count: d.ZalogCount ?? (d.GosnumberData?.ZalogData?.ListZalog?.length || 0),
    registrState: d.ZalogRegistrState ?? 0,
    prevDate: _fmtDate(d.ZalogRegistrPreviosDate),
    rows: (d.GosnumberData?.ZalogData?.ListZalog || []).map(z => ({ Id:z.Id, Type:z.Type }))
  };

  const avgCtx = (d.AvgMarket && (avg.PriceAvg || avg.PriceMin || avg.PriceMax || avg.DistanceAvg)) ? {
    min:_fmtNum(avg.PriceMin), avg:_fmtNum(avg.PriceAvg), max:_fmtNum(avg.PriceMax),
    dist:_fmtNum(avg.DistanceAvg), meta:`${avg.Marka||''} ${avg.Model||''} ${avg.Year||''}`.trim()
  } : null;

  const offers = (avg.Offers || []).map(o => ({
    date:_fmtDate(o.CreDate), marka:o.Marka||'', model:o.Model||'', year:o.Year||'',
    region:o.Region||'', city:o.City||'', distance:o.Distance!=null?`${_fmtNum(o.Distance)} км`:'—',
    ownerCount:(o.OwnerCount!=null && o.OwnerCount>=0) ? String(o.OwnerCount) : '—',
    price:o.Price!=null?`${_fmtNum(o.Price)} ₽`:'—', source:o.Url||''
  }));

  const updateBlocks = {
    RegHistory: upd.RegHistory ? `Есть информация=${upd.RegHistory.NeedUpdate?'Да':'Нет'}; Дата обновления информации:${_fmtDate(upd.RegHistory.Credate)}` : '—',
    Dtp: upd.Dtp ? `Есть информация=${upd.Dtp.NeedUpdate?'Да':'Нет'}; Дата обновления информации:${_fmtDate(upd.Dtp.Credate)}` : '—',
    Search: upd.Search ? `Есть информация=${upd.Search.NeedUpdate?'Да':'Нет'}; Дата обновления информации:${_fmtDate(upd.Search.Credate)}` : '—',
    Restrict: upd.Restrict ? `Есть информация=${upd.Restrict.NeedUpdate?'Да':'Нет'}; Дата обновления информации:${_fmtDate(upd.Restrict.Credate)}` : '—',
    Osago: upd.Osago ? `Есть информация=${upd.Osago.NeedUpdate?'Да':'Нет'}; Дата обновления информации:${_fmtDate(upd.Osago.Credate)}` : '—',
    Zalog: upd.Zalog ? `Есть информация=${upd.Zalog.NeedUpdate?'Да':'Нет'}; Дата обновления информации:${_fmtDate(upd.Zalog.Credate)}` : '—',
    Elpts: upd.Elpts ? `Есть информация=${upd.Elpts.NeedUpdate?'Да':'Нет'}; Дата обновления информации:${_fmtDate(upd.Elpts.Credate)}` : '—',
    GeneratingFines: upd.Generating?.Fines ? `generated=${upd.Generating.Fines.IsGenerated?'Да':'Нет'}; Есть информация=${upd.Generating.Fines.NeedUpdate?'Да':'Нет'}` : '—'
  };

  const requestDate = {
    Dtp:_fmtDate(reqDate.Dtp), Search:_fmtDate(reqDate.Search), Restrict:_fmtDate(reqDate.Restrict),
    Zalog:_fmtDate(reqDate.Zalog?.ZalogRequestDate), ZalogPrev:_fmtDate(reqDate.Zalog?.ZalogPreviosRequestDate),
    RegHistory:_fmtDate(reqDate.RegHistory)
  };

  const task = (json.Task||{});
  const taskCtx = {
    id: task.ID ?? '—',
    status: task.Status ?? '—',
    start: _fmtDate(task.StartGenerationDate),
    complete: _fmtDate(task.CompleteGenerationDate),
    statusServices: (task.StatusServices||[]).map(s => ({...s, date:_fmtDate(s.Date)}))
  };

  const hero = d.MainImage || (Array.isArray(d.ImageList)&&d.ImageList[0]?.Url) || '';
  const photos = (d.ImageList || []).map(ph => ({ Url: ph.Url, Caption: ph.Caption || '' }));

  return {
    title: d.Title || 'Отчёт по VIN',
    vin: d.Vin || '',
    reportDate: _fmtDate(d.ReportDate),
    reportNumber: d.ReportNumber || '',
    region: d.RegionGosnomer || '',
    whereVin: { title: d.WhereVin?.Title || '', url: d.WhereVin?.Url || '' },
    brandLogo:  BRAND_LOGO_URL || '', hero, photos,
    car, flags, gosnumbers: d.GosnumberList || [],
    ownership, mileage, dtp,
    otherDtp: d.OtherSourceDtp || [],
    eaisto, osago, search: searchCtx, restrict: restrictCtx, zalog: zalogCtx,
    avg: avgCtx, offers,
    vinData: d.VinData || [],
    elpts: d.Elpts ? `№: ${d.Elpts.Number || '—'}; статус: ${d.Elpts.Status || '—'}` : '—',
    finesImagesInfo: (d.FinesImages||[]).length ? `${d.FinesImages.length} шт.` : '—',
    servicesInfo: `Всего: ${d.ServicesData?.Total ?? 0}; записей: ${(d.ServicesData?.ServiceHistory || []).length}`,
    miscInfo: [
      `Demo=${d.isDemo?'Да':'Нет'}`, `Версия=${d.Version ?? '—'}`,
      `WhereVIN=${d.WhereVin?.Title ? 'есть' : '—'}`,
      `HasLinkParkon=${d.HasLinkParkon?'Да':'Нет'}`, `HasRepairs=${d.HasRepairs?'Да':'Нет'}`
    ].join('; '),
    updateBlocks, requestDate, task: taskCtx,
    version: d.Version ?? '—', isDemo: !!d.isDemo
  };
}

/** Генерация PDF и отправка в Telegram */
async function generateAndSendTronkPdf({ chatId, vin, payload, inlineImages = (process.env.TRONK_INLINE_IMAGES === '1') }) {
  try {
    const ctx = mapTronkToTemplate(payload);

    if (inlineImages) {
      const toDataUrl = async (url) => {
        if (!url || url.startsWith('data:')) return url || '';
        const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 15000 });
        const mime = res.headers['content-type'] || 'image/jpeg';
        const b64 = Buffer.from(res.data).toString('base64');
        return `data:${mime};base64,${b64}`;
      };
      if (ctx.brandLogo) ctx.brandLogo = await toDataUrl(ctx.brandLogo);
      if (ctx.hero) ctx.hero = await toDataUrl(ctx.hero);
      for (const x of (ctx.dtp||[])) if (x.schemaUrl) x.schemaUrl = await toDataUrl(x.schemaUrl);
      for (const p of (ctx.photos||[])) if (p.Url) p.Url = await toDataUrl(p.Url);
    }

    const fallbackHbs = `<!doctype html><html><head><meta charset="utf-8"><style>{{css}}</style><title>{{title}}</title></head>
      <body style="font-family:Arial, sans-serif; padding:16px;">
        <h1>{{title}}</h1>
        <div>VIN: <b>{{vin}}</b></div>
        <div>Дата отчёта: {{reportDate}}</div>
        <hr style="margin:12px 0;">
        <pre style="white-space:pre-wrap;font-size:12px;background:#f6f7f9;padding:10px;border:1px solid #eee;border-radius:8px;">{{json}}</pre>
      </body></html>`;
    const hbs = (REPORT_HBS && REPORT_HBS.length > 20) ? REPORT_HBS : fallbackHbs;

    const html = Handlebars.compile(hbs, { noEscape: true })({
      ...ctx,
      css: (REPORT_CSS && REPORT_CSS.length > 5) ? REPORT_CSS : '',
      json: JSON.stringify(payload, null, 2)
    });

    const pdfName = `Полный_отчёт_${vin || 'report'}_${Date.now()}.pdf`;
    const pdfPath = path.resolve(__dirname, 'uploads', pdfName);
    try { fsSync.mkdirSync(path.dirname(pdfPath), { recursive: true }); } catch {}

    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
      args: [
        '--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage',
        '--disable-gpu','--disable-software-rasterizer',
        '--disable-features=UseOzonePlatform','--use-gl=swiftshader','--single-process'
      ],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: pdfPath, format: 'A4', printBackground: true,
      margin: { top:'14mm', right:'12mm', bottom:'16mm', left:'12mm' }
    });
    await browser.close();

    await bot.telegram.sendDocument(
      chatId,
      { source: fsSync.createReadStream(pdfPath), filename: pdfName },
      { caption: `Отчёт(PDF)\nVIN: ${vin || '—'}` }
    );

    setTimeout(() => { try { fsSync.unlinkSync(pdfPath); } catch {} }, 60_000);
  } catch (e) {
    await bot.telegram.sendMessage(chatId, `Не удалось сформировать PDF: ${e.message}`);
  }
}

/* ========================== State & UI ========================== */
const userState = new Map();
const getState = (chatId) =>
  userState.get(String(chatId)) || {
    stage: 'idle',
    processing: false,
    lastVin: null,
    pendingBrandSelection: null,
    lastRfCardText: null,
    lastVagService: null, // 'equipment' | 'oem_history'
    paymentMenu: null,
    ephemeral: {} // { [tag]: message_id }
  };
const setState = (chatId, patch) => {
  const key = String(chatId);
  const prev = getState(key);
  userState.set(key, { ...prev, ...patch });
};

/* ===== Live Messages helpers (удаляем «живые» меню, не трогая информативные сообщения) ===== */
const EPHTAGS = Object.freeze({
  PAYMENT: 'payment',
  RF_PROGRESS: 'rf_progress',
});
async function deleteMessageById(chatId, messageId) {
  if (!messageId) return;
  try { await bot.telegram.deleteMessage(chatId, messageId); } catch {}
}
async function deleteCallbackMessage(ctx) {
  try { await ctx.deleteMessage(); } catch {}
}
function setEphemeralTag(chatId, tag, messageId) {
  const st = getState(chatId);
  const ephem = { ...(st.ephemeral || {}) };
  ephem[tag] = messageId;
  setState(chatId, { ephemeral: ephem });
}
async function deleteEphemeralTag(chatId, tag) {
  const st = getState(chatId);
  const ephem = { ...(st.ephemeral || {}) };
  if (ephem[tag]) {
    await deleteMessageById(chatId, ephem[tag]);
    delete ephem[tag];
    setState(chatId, { ephemeral: ephem });
  }
}

async function sendRfProgress(ctx, text) {
  const chatId = ctx.chat.id;
  await deleteEphemeralTag(chatId, EPHTAGS.RF_PROGRESS);
  const sent = await ctx.reply(text);
  setEphemeralTag(chatId, EPHTAGS.RF_PROGRESS, sent.message_id);
}

/* === Валидация VIN === */
const vinValidate = (vinRaw) => {
  if (!vinRaw) return false;
  const vin = String(vinRaw).trim().toUpperCase();
  const re = /^[A-HJ-NPR-Z0-9]{17}$/i; // без I,O,Q
  return re.test(vin) ? vin : false;
};

const buildRfKeyboard = () => Markup.inlineKeyboard([
  [Markup.button.callback('Полная проверка авто по РФ', 'full_check_rf')],
  [Markup.button.callback('Назад к выбору типа', 'back_to_type')]
]);

const buildStartKeyboard = () =>
  Markup.inlineKeyboard([[Markup.button.callback('🚀 Начать', 'start_flow')]]);

const MENU_BTN_EQUIPMENT = 'Проверка комплектации по VIN';
const MENU_BTN_OEM       = 'Проверка истории по дилерской базе';
const MENU_BTN_RF        = 'Полная проверка авто по РФ';
const MENU_BTN_MAIN      = 'Выбор типа проверки';

const buildReplyMainKeyboard = () =>
  Markup.keyboard(
    [
      [MENU_BTN_EQUIPMENT],
      [MENU_BTN_OEM],
      [MENU_BTN_RF],
      [MENU_BTN_MAIN],
    ],
  ).resize();

/* === Выбор типа === */
const sendTypeSelection = async (ctx) => {
  const chatId = ctx.chat.id;
  setState(chatId, { stage: 'choose_type', processing: false, pendingBrandSelection: null });
  await ensureStartedCommands(chatId);
  await ctx.replyHTML(MSG_SERVICES_HTML, Markup.inlineKeyboard([
    [Markup.button.callback('🇷🇺 Полная проверка истории авто по РФ', 'type_history')],
    [Markup.button.callback('🔗 Проверка истории по дилерской базе', 'type_oem_history')],
    [Markup.button.callback('👜 Проверка комплектации', 'type_equipment')]
  ]));
};
async function sendTypeSelectionByChat(chatId) {
  setState(chatId, { stage: 'choose_type', processing: false, pendingBrandSelection: null });
  const kb = Markup.inlineKeyboard([
    [Markup.button.callback('🇷🇺 Полная проверка истории авто по РФ', 'type_history')],
    [Markup.button.callback('🔗 Проверка истории по дилерской базе', 'type_oem_history')],
    [Markup.button.callback('👜 Проверка комплектации по VIN', 'type_equipment')]
  ]);
  await ensureStartedCommands(chatId);
  await sendHTML(chatId, MSG_SERVICES_HTML, kb);
}

/* === Пост-меню после отчётов vagvin === */
const buildPostMenuKeyboard = (lastVagService, rfNeedsNewVin = false) => {
  const firstRow =
    (lastVagService === 'equipment')
      ? [Markup.button.callback('Проверка истории по дилерской базе', 'type_oem_history')]
      : [Markup.button.callback('Проверка комплектации по VIN', 'type_equipment')];

  const secondRow = [Markup.button.callback('Ввести ещё один VIN', 'vag_again_same')];
  const thirdRow  = [Markup.button.callback('Полная проверка авто по РФ', rfNeedsNewVin ? 'full_check_rf_newvin' : 'full_check_rf')];

  return Markup.inlineKeyboard([firstRow, secondRow, thirdRow]);
};
const sendPostMenu = async (ctx, { rfNeedsNewVin = false } = {}) => {
  const st = getState(ctx.chat.id);
  const text =
    st.lastVagService === 'oem_history'
      ? MSG_AFTER_OEM
      : MSG_AFTER_EQUIP
  await ctx.replyHTML(text, buildPostMenuKeyboard(st.lastVagService, rfNeedsNewVin));
};
async function sendPostMenuByChat(chatId, { rfNeedsNewVin = false } = {}) {
  const st = getState(chatId);
  const text =
    st.lastVagService === 'oem_history'
      ? MSG_AFTER_OEM
      : MSG_AFTER_EQUIP
  await sendHTML(chatId, text, buildPostMenuKeyboard(st.lastVagService, rfNeedsNewVin));
}

async function sendPostMenuAwaitingByChat(chatId, { rfNeedsNewVin = false } = {}) {
  const st = getState(chatId);
  await sendHTML(chatId, MSG_VAG_AWAITING, buildPostMenuKeyboard(st.lastVagService, rfNeedsNewVin));
}
const sendPostMenuAwaiting = async (ctx, { rfNeedsNewVin = false } = {}) => {
  const st = getState(ctx.chat.id);
  await ctx.replyHTML(MSG_VAG_AWAITING, buildPostMenuKeyboard(st.lastVagService, rfNeedsNewVin));
};

/* === Пост-меню после ПОЛНОЙ РФ-проверки === */
const buildPostMenuAfterRF = () => Markup.inlineKeyboard([
  [Markup.button.callback('Проверка истории по дилерской базе', 'type_oem_history')],
  [Markup.button.callback('Проверка комплектации по VIN', 'type_equipment')],
  [Markup.button.callback('Ввести ещё один VIN (полная проверка)', 'full_check_rf_newvin')]
]);
const sendPostMenuAfterRF = async (ctx) => { await ctx.replyHTML(MSG_AFTER_RF, buildPostMenuAfterRF()); };
async function sendPostMenuAfterRFByChat(chatId) {
  await sendHTML(chatId, MSG_AFTER_RF, buildPostMenuAfterRF());
}

/* === Проверка подписки на канал === */
async function isUserSubscribed(chatId) {
  try {
    const member = await bot.telegram.getChatMember(RF_SUBS_CHANNEL, chatId);
    const ok = ['member','administrator','creator'].includes(member.status);
    return !!ok;
  } catch (e) {
    console.warn('[SUBS CHECK] err:', e?.message || e);
    return false;
  }
}

/* Карточка РФ + меню РФ (эта ИНФОРМАЦИЯ НЕ удаляется) */
const sendMinimalVehicleInfo = async (ctx, vehicle) => {
  const lines = [
    `📄Подготовил отчёт по Вашему запросу:`,
    `🚘VIN: ${vehicle.vin || '—'}`,
    ` 🛞Марка/модель: ${vehicle.brand || vehicle.model || '—'}`,
    ` 🛞Год: ${vehicle.year || '—'}`,
    ` 🛞Цвет: ${vehicle.color || '—'}`,
    ` 🛞Объем двигателя: ${vehicle.engineVolume || '—'}`,
    ` 🛞Номер двигателя: ${vehicle.engineNumber || '—'}`,
    ` 🛞ПТС: ${vehicle.vehiclePassportNumber || '—'}`,
  ];
  if (vehicle.events && vehicle.events.length) {
    lines.push('', 'Найденные события:');
    vehicle.events.forEach((ev, i) => lines.push(`${i + 1}. ${ev}`));
  } else {
    lines.push('', 'Серьёзных событий (ДТП/розыск/ограничения) не найдено.');
  }
  const text = lines.join('\n');

  await ctx.reply(text, buildRfKeyboard());
  setState(ctx.chat.id, { lastRfCardText: text });
};

const sendRfMenuOnly = async (ctx, vin) => {
  const prefix = vin ? `VIN: ${vin}\n` : '';
  await ctx.reply(`${prefix}Кажется, мы знаем где выгоднее приобрести этот автомобиль. А оплата после получения авто 👉 https://unityauto.ru/cars/\nПродолжим проверку?\nВыберите:
`, buildRfKeyboard());
};

/* ========================== api-assist (РФ) + vPIC ========================== */
const API = {
  get: async (path, params = {}) => {
    const url = `${API_ASSIST_BASE}${path}`;
    const fullParams = { key: API_ASSIST_KEY, ...params };
    return axios.get(url, { params: fullParams, timeout: 12000 });
  }
};

const apiAssistStat = async () => { try { return (await API.get('/stat/')).data; } catch { return null; } };

const apiAssistHistory = async (vin) => {
  try {
    const r = await API.get('/parser/gibdd_api/history', { vin });
    const body = r.data;
    if (body && body.success === 1 && body.history) {
      const h = body.history;
      return {
        ok: true,
        data: {
          vin: h.vin || vin,
          model: h.model || null,
          year: h.year || null,
          color: h.color || null,
          engineVolume: h.engineVolume || null,
          engineNumber: h.engineNumber || null,
          vehiclePassportNumber: (h.vehiclePassport && h.vehiclePassport.number) ? h.vehiclePassport.number : null,
          raw: body
        }
      };
    }
    return { ok: false, error: body && (body.error || 'no data'), raw: body };
  } catch (e) {
    if (e.response && e.response.status === 403) {
      const body = e.response.data || {};
      return { ok: false, error: body.error || `403 (api-assist)`, code: 403, raw: body };
    }
    throw e;
  }
};

const apiAssistAccident = async (vin) => {
  try {
    const r = await API.get('/parser/gibdd_api/accident', { vin });
    const body = r.data;
    if (body && body.success === 1 && Array.isArray(body.accidents) && body.accidents.length) {
      return { ok: true, data: body.accidents, raw: body };
    }
    return { ok: false, error: body && (body.error || 'no accidents'), raw: body };
  } catch (e) {
    if (e.response && e.response.status === 403) {
      return { ok: false, error: e.response.data?.error || '403', code: 403, raw: e.response.data };
    }
    throw e;
  }
};

const apiAssistWanted = async (vin) => {
  try {
    const r = await API.get('/parser/gibdd_api/wanted', { vin });
    const body = r.data;
    if (body && body.success === 1 && Array.isArray(body.searches) && body.searches.length) {
      return { ok: true, data: body.searches, raw: body };
    }
    return { ok: false, error: body && (body.error || 'no searches'), raw: body };
  } catch (e) {
    if (e.response && e.response.status === 403) {
      return { ok: false, error: e.response.data?.error || '403', code: 403, raw: e.response.data };
    }
    throw e;
  }
};

const apiAssistRestrict = async (vin) => {
  try {
    const r = await API.get('/parser/gibdd_api/restrict', { vin });
    const body = r.data;
    if (body && body.success === 1 && Array.isArray(body.restrictions) && body.restrictions.length) {
      return { ok: true, data: body.restrictions, raw: body };
    }
    return { ok: false, error: body && (body.error || 'no restrictions'), raw: body };
  } catch (e) {
    if (e.response && e.response.status === 403) {
      return { ok: false, error: e.response.data?.error || '403', code: e.response?.status || 403, raw: e.response.data };
    }
    throw e;
  }
};

const apiAssistCheck = async (vin) => {
  try { const stat = await apiAssistStat(); if (stat) console.log('api-assist stat:', stat); } catch {}
  let historyResp;
  try { historyResp = await apiAssistHistory(vin); } catch (e) { throw e; }

  if (historyResp.ok) {
    const vehicle = historyResp.data;
    const events = [];
    try {
      const [acc, wan, restr] = await Promise.allSettled([
        apiAssistAccident(vin), apiAssistWanted(vin), apiAssistRestrict(vin)
      ]);
      if (acc.status === 'fulfilled' && acc.value.ok && acc.value.data.length) {
        acc.value.data.forEach(a => {
          const desc = `${a.accidentDatetime || a.accidentDate || ''} ${a.regionName || a.accidentPlace || ''} — ${a.accidentType || ''} ${a.damageDescription ? `(${ (a.damageDescription||[]).slice(0,3).join(', ') })` : ''}`.trim();
          if (desc) events.push(`ДТП: ${desc}`);
        });
      }
      if (wan.status === 'fulfilled' && wan.value.ok && wan.value.data.length) {
        wan.value.data.forEach(w => {
          const s = `Розыск: ${(w.region || w.search_date || '')} ${(w.model || '')}`.trim();
          if (s) events.push(s);
        });
      }
      if (restr.status === 'fulfilled' && restr.value.ok && restr.value.data.length) {
        restr.value.data.forEach(r => {
          const s = `Ограничение: ${r.restriction_name || r.type || ''} (${r.region || ''})`.trim();
          if (s) events.push(s);
        });
      }
    } catch (e) { console.warn('Доп. проверки дали ошибку:', e?.message || e); }

    return { found: true, vehicle: { ...vehicle, events }, raw: { history: historyResp.raw } };
  }

  if (historyResp.code === 403 || (historyResp.raw && historyResp.raw.error_code && String(historyResp.raw.error_code).startsWith('403'))) {
    return { found: false, error: historyResp.error || 'Forbidden / limit or invalid key', code: 403, raw: historyResp.raw };
  }

  return { found: false, reason: historyResp.error || 'no data', raw: historyResp.raw };
};

const vpicDecode = async (vin) => {
  try {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${encodeURIComponent(vin)}?format=json`;
    const r = await axios.get(url, { timeout: 10000 });
    const results = r.data?.Results ? r.data.Results : [];
    const report = {};
    results.forEach(({ Variable, Value }) => {
      if (Variable && Value && Value !== 'Не найдено' && Value !== '0') report[Variable] = Value;
    });
    return { ok: true, report, raw: r.data };
  } catch (e) { return { ok: false, error: e.message || String(e) }; }
};

/* ====================== vPIC → RU локализация + рендер ====================== */
const VPIC_LABELS_RU = Object.freeze({
  'Make': ' 🛞Марка',
  'Model': ' 🛞Модель',
  'Trim': 'К 🛞омплектация',
  'Model Year': ' 🛞Год модели',
  'Vehicle Type': ' 🛞Тип ТС',
  'Body Class': ' 🛞Класс кузова',
  'Manufacturer': ' 🛞Производитель',
  'Plant Country': ' 🛞Страна сборки',
  'Plant City': ' 🛞Город сборки',
  'Fuel Type - Primary': ' 🛞Тип топлива',
  'Engine Model': ' 🛞Модель двигателя',
  'Engine Number of Cylinders': ' 🛞Число цилиндров',
  'Engine Displacement (L)': ' 🛞Объём двигателя (л)',
  'Engine Displacement (CI)': ' 🛞Объём двигателя (дюйм³)',
  'Transmission Style': ' 🛞Тип КПП',
  'Transmission Speeds': ' 🛞КПП (ступеней)',
});

const VPIC_VALUE_RU = Object.freeze({
  'PASSENGER CAR': 'Легковой автомобиль',
  'SPORT UTILITY VEHICLE (SUV)': 'Внедорожник (SUV)',
  'MULTIPURPOSE PASSENGER VEHICLE (MPV)': 'Многоцелевой легковой автомобиль (MPV)',
  'TRUCK': 'Грузовой автомобиль',
});

function renderVpicReportRu({ report, vin, title = '📄Подготовил отчёт по Вашему запросу\n' }) {
  if (!report || !Object.keys(report).length) {
    return `${title} по VIN ${vin}:\nДанные не найдены.`;
  }
  const keysOrder = [
    'Make','Model','Trim','Model Year',
    'Vehicle Type','Body Class',
    'Manufacturer','Plant Country','Plant City',
    'Fuel Type - Primary',
    'Engine Model','Engine Number of Cylinders','Engine Displacement (L)',
    'Transmission Style','Transmission Speeds',
  ];
  const lines = [`${title} по VIN ${vin}:`];
  for (const k of keysOrder) {
    const raw = report[k];
    if (!raw) continue;
    const label = VPIC_LABELS_RU[k] || k;
    const value = (k === 'Vehicle Type' && VPIC_VALUE_RU[raw]) ? VPIC_VALUE_RU[raw] : raw;
    lines.push(`${label}: ${value}`);
  }
  return lines.join('\n');
}

/* ========================== vagvin submit ========================== */
const genUid = (p='uid') => `${p}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;

const buildWebhookAdressPost = () => {
  if (!WEBHOOK_PUBLIC_BASE) return '';
  const base = WEBHOOK_PUBLIC_BASE.replace(/\/+$/, '');
  return `${base}/vagvin/webhook?secret=${encodeURIComponent(WEBHOOK_SECRET)}`;
};

const vagvinSubmit = async ({ vin, marka, command_str, lang = VAGVIN_LANG, email = VAGVIN_EMAIL, chatId, type } = {}) => {
  if (!VAGVIN_API_URL) throw new Error('VAGVIN_API_URL не настроен');
  if (!VAGVIN_API_KEY) throw new Error('VAGVIN_API_KEY не настроен');

  const uid = genUid('vagvin');
  const order_uiid = genUid('order');
  const adress_post = buildWebhookAdressPost();

  const payload = {
    api_key: VAGVIN_API_KEY,
    vin, lang, uid, order_uiid,
    adress_post: adress_post || undefined,
    email,
    commands: command_str,
    marka
  };

  const job = { chatId, vin, type: type || command_str || 'unknown', createdAt: new Date().toISOString(), uid, order_uiid };
  await jobsStore.put(uid, job);
  await jobsStore.put(order_uiid, job);

  const payloadLog = { ...payload, api_key: maskKey(VAGVIN_API_KEY) };
  console.log('[vagvinSubmit] POST', VAGVIN_API_URL, 'payload:', JSON.stringify(payloadLog));

  try {
    const resp = await axios.post(VAGVIN_API_URL, payload, { timeout: 20000 });
    console.log('[vagvinSubmit] response', resp.status, resp.statusText);
    return { ok: true, data: resp.data, uid, order_uiid, adress_post, transport: 'POST JSON' };
  } catch (err) {
    const status = err?.response?.status;
    const data = err?.response?.data;

    let providerError = null;
    if (data && typeof data === 'object' && typeof data.error === 'string') {
      providerError = data.error;
    } else if (typeof data === 'string') {
      try { const j = JSON.parse(data); if (typeof j.error === 'string') providerError = j.error; } catch {}
    }

    const human = providerError || (status ? `[${status}] ` : '') + (err?.message || 'vagvin error');
    console.error('[vagvinSubmit] error:', typeof data === 'string' ? data : JSON.stringify(data));

    return { ok: false, error: human, httpStatus: status, raw: data };
  }
};

/* ========================== BRAND UI ========================== */
const BRANDS_PAGE_SIZE = 12;
const brandPageCount = Math.max(1, Math.ceil(BRANDS_LIST.length / BRANDS_PAGE_SIZE));

const buildBrandKeyboard = (page = 0) => {
  const p = Math.max(0, Math.min(brandPageCount - 1, page));
  const start = p * BRANDS_PAGE_SIZE;
  const items = BRANDS_LIST.slice(start, start + BRANDS_PAGE_SIZE);

  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    const r = [];
    for (let j = 0; j < 3 && (i + j) < items.length; j++) {
      const idx = start + i + j;
      const name = items[i + j];
      r.push(Markup.button.callback(name, `brand_pick_${idx}`));
    }
    rows.push(r);
  }

  if (brandPageCount > 1) {
    const nav = [];
    if (p > 0) nav.push(Markup.button.callback('◀️', `brand_page_${p - 1}`));
    nav.push(Markup.button.callback(`${p + 1}/${brandPageCount}`, 'noop'));
    if (p < brandPageCount - 1) nav.push(Markup.button.callback('▶️', `brand_page_${p + 1}`));
    rows.push(nav);
  }

  rows.push([Markup.button.callback('Назад к выбору типа', 'back_to_type')]);
  return Markup.inlineKeyboard(rows);
};

const askBrandSelection = async (ctx, { vin, service, command_str, note }) => {
  const chatId = ctx.chat.id;
  setState(chatId, { stage: 'await_brand_selection', pendingBrandSelection: { vin, service, command_str } });
  const msg = (note ? `${note}\n\n` : '') + `Не удалось определить марку по VIN ${vin}. Выберите марку:`;
  await ctx.reply(msg, buildBrandKeyboard(0));
};

/* ========================== COMMAND MENU ========================== */
const clearGlobalCommands = async () => {
  try { await bot.telegram.setMyCommands([]); }
  catch (e) { console.warn('clearGlobalCommands failed:', e?.message || e); }
};
const clearCommandsForChat = async (chatId) => {
  try { await bot.telegram.setMyCommands([], { scope: { type: 'chat', chat_id: chatId } }); }
  catch (e) { console.warn('clearCommandsForChat failed:', e?.message || e); }
};
// Ставим стандартную кнопку меню без кастомных элементов
const setMenuButtonDefault = async (chatId) => {
  try {
    if (chatId) {
      await bot.telegram.setChatMenuButton({ chat_id: chatId, menu_button: { type: 'default' } });
    } else {
      await bot.telegram.setChatMenuButton({ menu_button: { type: 'default' } });
    }
  } catch (e) { console.warn('setChatMenuButton failed:', e?.message || e); }
};
// shim
const ensureStartedCommands = async (chatId) => {
  await clearCommandsForChat(chatId);
  await setMenuButtonDefault(chatId);
};

/* ========================== YooKassa ========================== */
const YKC_SHOP_ID = process.env.YKC_SHOP_ID || '';
const YKC_SECRET_KEY = process.env.YKC_SECRET_KEY || '';
const YKC_RETURN_URL = process.env.YKC_RETURN_URL || 'https://yookassa.ru';
const YKC_CURRENCY = process.env.YKC_CURRENCY || 'RUB';

const YKC_PRICE_TRONK_RF = process.env.YKC_PRICE_TRONK_RF || '99.00';
const YKC_PRICE_VAG_EQUIP = process.env.YKC_PRICE_VAG_EQUIP || '299.00';
const YKC_PRICE_VAG_OEM   = process.env.YKC_PRICE_VAG_OEM   || '499.00';

const yoo = new YooKassa({ shopId: YKC_SHOP_ID, secretKey: YKC_SECRET_KEY });
console.log('[YKC init] shopId=%s key=%s', YKC_SHOP_ID || '-', maskKey(YKC_SECRET_KEY));

const _sleep = (ms) => new Promise(r => setTimeout(r, ms));

function _formatMoney(value, currency = 'RUB') {
  const zeroMinor = new Set(['JPY','KRW','CLP','ISK']);
  const v = Number(value || 0);
  if (Number.isNaN(v) || v <= 0) return null;
  return zeroMinor.has(currency) ? String(Math.floor(v)) : v.toFixed(2);
}
function _yooErrDetails(err) {
  const status = err?.response?.status;
  const data = err?.response?.data;
  const code = data?.code;
  const desc = data?.description || data?.message || err?.message;
  const param = data?.parameter;
  return { status, code, description: desc, parameter: param, raw: data };
}

async function ykcCreatePayment({ chatId, vin, flow, amount, description, extraMeta = {}, capture }) {
  const captureFlag = (typeof capture === 'boolean')
    ? capture
    : (flow === 'tronk_rf'); // TRONK — одноэтапный, vagvin — двухстадийный

  const body = {
    amount: { value: String(amount), currency: YKC_CURRENCY },
    capture: captureFlag,
    description: description || `Оплата: ${flow} (VIN ${vin || '-'})`,
    confirmation: { type: 'redirect', return_url: YKC_RETURN_URL },
    metadata: { chat_id: String(chatId), vin: vin || '', flow, ...extraMeta }
  };

  const idemp = uuidv4();
  const payment = await yoo.createPayment(body, idemp);
  const url = payment?.confirmation?.confirmation_url;
  if (!url) throw new Error('YooKassa did not return confirmation_url');
  return { paymentId: payment.id, confirmationUrl: url, status: payment.status, metadata: payment.metadata };
}

async function ykcCaptureRaw(paymentId, body) {
  const idemp = uuidv4();
  return yoo.capturePayment(paymentId, body, idemp);
}
async function ykcCancelPayment(paymentId) {
  const idemp = uuidv4();
  return yoo.cancelPayment(paymentId, idemp);
}

/** Мягкий capture с повторами */
async function ykcCaptureWithRetries(paymentId, opts = {}) {
  const {
    explicitAmount, currency,
    attempts = 3,
    retryDelayMs = 1200,
    finalBackoffAttempts = 6,
    finalBackoffDelayMs = 3000,
  } = opts;

  const attemptOnce = async (variant, paymentSnap) => {
    try {
      if (variant === 1) return await ykcCaptureRaw(paymentId, undefined);
      if (variant === 2) {
        const amount = explicitAmount || paymentSnap?.amount?.value;
        const curr   = currency || paymentSnap?.amount?.currency || 'RUB';
        return await ykcCaptureRaw(paymentId, { amount: { value: String(amount), currency: curr } });
      }
      if (variant === 3) {
        const amount = _formatMoney(Number(explicitAmount || paymentSnap?.amount?.value), currency || paymentSnap?.amount?.currency || 'RUB');
        const curr   = currency || paymentSnap?.amount?.currency || 'RUB';
        return await ykcCaptureRaw(paymentId, { amount: { value: String(amount), currency: curr } });
      }
      return await ykcCaptureRaw(paymentId, undefined);
    } catch (e) {
      const det = _yooErrDetails(e);
      console.error('[YKC capture] fail', JSON.stringify({ paymentId, variant, ...det }, null, 2));
      throw Object.assign(new Error(det.description || 'capture error'), { details: det });
    }
  };

  for (let i = 1; i <= attempts; i++) {
    const paymentSnap = await yoo.getPayment(paymentId);
    if (paymentSnap.status === 'succeeded') return { ok: true, payment: paymentSnap };
    if (paymentSnap.status === 'canceled')  return { ok: false, canceled: true, last: paymentSnap };

    try {
      const res = await attemptOnce(i, paymentSnap);
      return { ok: true, payment: res };
    } catch (e) {
      if (i < attempts) await _sleep(retryDelayMs);
    }
  }

  let backoff = finalBackoffDelayMs;
  for (let j = 1; j <= finalBackoffAttempts; j++) {
    const snap = await yoo.getPayment(paymentId);
    if (snap.status === 'succeeded') return { ok: true, payment: snap };
    if (snap.status === 'canceled')  return { ok: false, canceled: true, last: snap };

    try {
      const res = await attemptOnce(1, snap);
      return { ok: true, payment: res };
    } catch (e) {
      await _sleep(backoff);
      backoff = Math.min(backoff * 1.6, 20000);
    }
  }

  const last = await yoo.getPayment(paymentId);
  return { ok: last.status === 'succeeded', payment: last, canceled: last.status === 'canceled', last };
}

/* === Refund helper === */
async function ykcRefundPayment({ paymentId, paymentObj, amountValue, currency, description }) {
  let payment = paymentObj;
  if (!payment) payment = await yoo.getPayment(paymentId);
  const pid = payment?.id || paymentId;
  const curr = currency || payment?.amount?.currency || 'RUB';

  const total = Number(payment?.amount?.value || 0);
  const refunded = Number(payment?.refunded_amount?.value || 0);
  const remain = Math.max(0, total - refunded);

  let toRefund = typeof amountValue === 'number' ? Math.min(amountValue, remain) : remain;

  const formatted = _formatMoney(toRefund, curr);
  if (!formatted || Number(formatted) <= 0) {
    return { ok: false, reason: 'nothing_to_refund', note: 'Nothing left to refund' };
  }

  const body = {
    payment_id: pid,
    amount: { value: String(formatted), currency: curr },
    description: description || 'Refund after provider error'
  };

  const idemp = uuidv4();

  try {
    const refund = await yoo.createRefund(body, idemp);
    return { ok: true, refund };
  } catch (err) {
    const det = _yooErrDetails(err);
    console.error('[YKC refund] err', JSON.stringify({ body, idemp, ...det }, null, 2));
    return { ok: false, error: det.description || err.message, details: det };
  }
}

/** Показ оплаты (живое меню: удаляется после успешной оплаты/выхода) */
async function showPaymentPrompt(ctx, { title, vin, amount, url, backAction, note }) {
  const lines = [
    note ? `⚠️ ${note}` : null,
    `Оплата услуги: ${title}`,
    vin ? `VIN: ${vin}` : null,
    `Сумма: ${amount} ₽`,
    '',
    'Нажимая «Оплатить», вы принимаете Политику конфиденциальности и Пользовательское соглашение (кнопки ниже).'
  ].filter(Boolean);

  const menuId = genUid('menu');
  const chatId = ctx.chat.id;

  // Снесём предыдущее меню оплаты, если зависло
  await deleteEphemeralTag(chatId, EPHTAGS.PAYMENT);

  const paymentMenu = {
    id: menuId,
    createdAt: new Date().toISOString(),
    sent: { privacy: false, terms: false },
    inFlight: { privacy: false, terms: false },
    ttlMs: 30 * 60 * 1000, // 30 минут
    messageId: null
  };
  setState(chatId, { paymentMenu });

  const kb = Markup.inlineKeyboard([
    [Markup.button.url('💳 Оплатить', url)],
    [Markup.button.callback('⬅️ Назад', backAction)],
    [Markup.button.callback('🔒 Политика конфиденциальности', `legal:privacy:${menuId}`)],
    [Markup.button.callback('📄 Пользовательское соглашение', `legal:terms:${menuId}`)]
  ]);

  const sent = await ctx.reply(lines.join('\n'), kb);

  // Запомним ID сообщения, чтобы удалить после оплаты
  paymentMenu.messageId = sent.message_id;
  setState(chatId, { paymentMenu });
  setEphemeralTag(chatId, EPHTAGS.PAYMENT, sent.message_id);
}

async function deletePaymentPromptByChat(chatId) {
  const st = getState(chatId);
  const msgId = st.paymentMenu?.messageId;
  if (msgId) await deleteMessageById(chatId, msgId);
  await deleteEphemeralTag(chatId, EPHTAGS.PAYMENT);
  setState(chatId, { paymentMenu: null });
}

/* ========================== TRONK report (create→check→result) ========================== */
const TRONK_API_KEY = process.env.TRONK_API_KEY || '';
const TRONK_ENDPOINT = process.env.TRONK_ENDPOINT || 'https://data.tronk.info/reportjson.ashx';

const tronkJsonClient = axios.create({ baseURL: TRONK_ENDPOINT, timeout: 20000 });

const TRONK_DEBUG_CHAT = (process.env.TRONK_DEBUG_CHAT || '').toLowerCase() === 'true' || process.env.TRONK_DEBUG_CHAT === '1';
const TRONK_DEBUG_CONSOLE = true;

bot.action(/^legal:(privacy|terms):(.+)$/i, async (ctx) => {
  const chatId = ctx.chat.id;
  const docType = (ctx.match[1] || '').toLowerCase();
  const menuIdFromBtn = ctx.match[2];
  const st = getState(chatId);
  const pm = st.paymentMenu;
  const cb = (text) => ctx.answerCbQuery(text).catch(() => {});

  const isExpired = () => {
    if (!pm || !pm.createdAt) return true;
    const ttl = Number(pm.ttlMs || 0);
    if (!ttl) return false;
    return (Date.now() - new Date(pm.createdAt).getTime()) > ttl;
  };

  if (!pm || !pm.id || pm.id !== menuIdFromBtn || isExpired()) {
    return cb('Это меню устарело. Откройте актуальное.');
  }

  if (pm.inFlight?.[docType]) return cb('Отправляю…');
  if (pm.sent?.[docType]) return cb('Уже отправлял');

  pm.inFlight = pm.inFlight || {};
  pm.sent = pm.sent || {};
  pm.inFlight[docType] = true;
  setState(chatId, { paymentMenu: pm });

  try {
    const filePath = docType === 'privacy' ? LEGAL_PRIVACY_PDF_PATH : LEGAL_TERMS_PDF_PATH;
    if (fsSync.existsSync(filePath)) {
      const filename = path.basename(filePath).replace(/\s+/g, '_');
      await bot.telegram.sendDocument(
        chatId,
        { source: fsSync.createReadStream(filePath), filename }
      );
      pm.sent[docType] = true;
      setState(chatId, { paymentMenu: pm });
      return cb('Отправил PDF');
    }
    const url = docType === 'privacy' ? LEGAL_PRIVACY_URL : LEGAL_TERMS_URL;
    await ctx.reply(url);
    pm.sent[docType] = true;
    setState(chatId, { paymentMenu: pm });
    return cb('Файл не найден — отправил ссылку');
  } catch (e) {
    console.error('[LEGAL PDF] send error:', e?.message || e);
    await ctx.reply('Не удалось отправить документ. Попробуйте позже.');
    return cb('Ошибка отправки');
  } finally {
    const st2 = getState(chatId);
    const pm2 = st2.paymentMenu || pm;
    if (pm2 && pm2.inFlight) pm2.inFlight[docType] = false;
    setState(chatId, { paymentMenu: pm2 });
  }
});

function _redactTronkParams(p = {}) {
  const out = { ...p };
  if (out.key) out.key = maskKey(String(out.key));
  return out;
}

async function _tronkLogToChat(bot, chatId, title, payload) {
  if (!TRONK_DEBUG_CHAT || !chatId) return;
  try {
    const pretty = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    const chunks = pretty.match(/[\s\S]{1,3500}/g) || [];
    await bot.telegram.sendMessage(chatId, `*TRONK ${title}* \n\`\`\`json\n${chunks[0]}\n\`\`\``, { parse_mode: 'Markdown' });
    for (let i = 1; i < Math.min(chunks.length, 4); i++) {
      await bot.telegram.sendMessage(chatId, '```json\n' + chunks[i] + '\n```', { parse_mode: 'Markdown' });
    }
    if (chunks.length > 4) {
      await bot.telegram.sendMessage(chatId, '⚠️ Лог большой, остальное опущено.');
    }
  } catch (e) {
    console.error('[TRONK log→chat] fail:', e?.message || e);
  }
}

function _tronkLogConsole(title, payload) {
  if (!TRONK_DEBUG_CONSOLE) return;
  try {
    const msg = typeof payload === 'string' ? payload : shorten(payload, 4000);
    console.log(`[TRONK] ${title}:`, msg);
  } catch (e) {
    console.log(`[TRONK] ${title}: (log error)`, e?.message || e);
  }
}

async function tronkRequest(params, { chatId, tag } = {}) {
  const safe = _redactTronkParams(params);
  _tronkLogConsole(`REQUEST${tag ? '('+tag+')' : ''}`, { endpoint: TRONK_ENDPOINT, params: safe });
  await _tronkLogToChat(bot, chatId, `REQUEST${tag ? ' '+tag : ''}`, { endpoint: TRONK_ENDPOINT, params: safe });

  const r = await tronkJsonClient.get('', { params, responseType: 'json', validateStatus: s => s >= 200 && s < 500 });
  let data = r.data;
  if (typeof data === 'string') { try { data = JSON.parse(data); } catch {} }

  _tronkLogConsole(`RESPONSE${tag ? '('+tag+')' : ''}`, { status: r.status, data: shorten(data, 4000) });
  await _tronkLogToChat(bot, chatId, `RESPONSE${tag ? ' '+tag : ''} (HTTP ${r.status})`, data);

  return { status: r.status, data };
}

async function tronkCreate({ vin, gosnumber, frame }, extra) {
  if (!TRONK_API_KEY) return { ok: false, error: 'TRONK_API_KEY не настроен' };
  const params = { key: TRONK_API_KEY, mode: 'create' };
  if (vin) params.vin = vin;
  if (gosnumber) params.gosnumber = gosnumber;
  if (frame) params.frame = frame;
  if (!params.vin && !params.gosnumber && !params.frame) return { ok: false, error: 'Нужно указать vin' };

  const r = await tronkRequest(params, { ...extra, tag: 'create' });
  if (r.status !== 200) return { ok: false, error: `HTTP ${r.status}`, raw: r.data };
  if (r.data?.Error) return { ok: false, error: r.data?.ErrorMsg || r.data?.Msg || 'create error', raw: r.data };

  const id = r.data?.Task?.ID ?? r.data?.ID ?? r.data?.Task?.Id ?? r.data?.Id;
  if (!id) return { ok: false, error: 'create: не вернулся ID', raw: r.data };
  return { ok: true, id: Number(id), raw: r.data };
}

async function tronkCheck({ id }, extra) {
  if (!TRONK_API_KEY) return { ok: false, error: 'TRONK_API_KEY не настроен' };
  const r = await tronkRequest({ key: TRONK_API_KEY, mode: 'check', id }, { ...extra, tag: 'check' });
  if (r.status !== 200) return { ok: false, error: `HTTP ${r.status}`, raw: r.data };
  if (r.data?.Error) return { ok: false, error: r.data?.ErrorMsg || r.data?.Msg || 'check error', raw: r.data };
  return { ok: true, data: r.data };
}

async function tronkResult({ id }, extra) {
  if (!TRONK_API_KEY) return { ok: false, error: 'TRONK_API_KEY не настроен' };
  const r = await tronkRequest({ key: TRONK_API_KEY, mode: 'result', id }, { ...extra, tag: 'result' });
  if (r.status !== 200) return { ok: false, error: `HTTP ${r.status}`, raw: r.data };
  if (!r.data || r.data.Error === true) return { ok: false, error: r.data?.ErrorMsg || r.data?.Msg || 'result: пустой/ошибка', raw: r.data };
  return { ok: true, data: r.data };
}

/** Готовность */
function tronkIsReady(checkObj) {
  const t = checkObj?.Task;
  return !!t && Number(t.Status) === 1;
}

/** create → check → result */
async function tronkFetchReportJson({ vin, gosnumber, frame, id, extra = {} } = {}) {
  try {
    let reportId = id;

    if (!reportId) {
      const created = await tronkCreate({ vin, gosnumber, frame }, extra);
      if (!created.ok) return created;
      reportId = created.id;
      _tronkLogConsole('CREATE_OK', { id: reportId });
      await _tronkLogToChat(bot, extra.chatId, 'CREATE_OK', { id: reportId });

      if (extra.paymentId) {
        await paymentsStore.merge(extra.paymentId, { tronkTaskId: reportId, vin, flow: 'tronk_rf' });
      }
    }

    const plan = [
      { totalMs: 5 * 60_000, stepMs: 10_000 },
      { totalMs: 10 * 60_000, stepMs: 30_000 },
      { totalMs: 15 * 60_000, stepMs: 60_000 },
    ];
    let ready = false;
    for (const stage of plan) {
      const started = Date.now();
      while (Date.now() - started < stage.totalMs) {
        const chk = await tronkCheck({ id: reportId }, extra);
        if (!chk.ok) return { ok: false, error: chk.error, raw: chk.data };
        if (tronkIsReady(chk.data)) { ready = true; break; }
        await _tronkLogToChat(bot, extra.chatId, 'CHECK_PROGRESS', chk.data?.Task || chk.data || {});
        await _sleep(stage.stepMs);
      }
      if (ready) break;
    }

    const res = await tronkResult({ id: reportId }, extra);
    if (!res.ok) return res;

    let payload = res.data;
    if (!payload.Result && payload.data) payload = { Result: { data: payload.data }, Error: false, Msg: null };
    return { ok: true, data: payload, id: reportId };
  } catch (e) {
    return { ok: false, error: e?.message || 'Неожиданная ошибка' };
  }
}

/** Сохранить JSON и отправить в чат */
async function sendTronkJsonToChat({ chatId, vin, payload }) {
  try {
    const fileName = `Полный_отчёт_${vin || 'report'}_${Date.now()}.json`;
    const filePath = path.resolve(__dirname, 'uploads', fileName);
    try { fsSync.mkdirSync(path.dirname(filePath), { recursive: true }); } catch {}
    const pretty = JSON.stringify(payload, null, 2);
    await fs.writeFile(filePath, pretty, 'utf8');

    await bot.telegram.sendDocument(
      chatId,
      { source: fsSync.createReadStream(filePath), filename: fileName },
      { caption: `Полный отчёт(JSON)\nVIN: ${vin || '—'}` }
    );
    setTimeout(() => { try { fsSync.unlinkSync(filePath); } catch {} }, 15_000);
  } catch (e) {
    await bot.telegram.sendMessage(chatId, `Не удалось отправить JSON-файл: ${e.message}`);
  }
}

/* ========================== Post-payment router ========================== */
async function onPaymentSucceeded({ chatId, vin, flow, payment }) {
  try {
    // Удалим «живое» меню оплаты
    await deletePaymentPromptByChat(chatId);

    if (flow === 'tronk_rf') {
      if (!TRONK_API_KEY) {
        await bot.telegram.sendMessage(chatId, 'Не задан API_KEY в .env, не могу получить отчёт.');
        return;
      }

      const prevState = await paymentsStore.get(payment.id);
      if (!prevState?.succeededAnnounced) {
        await sendHTML(chatId, MSG_REPORT_REQUESTED_OK,);
        await paymentsStore.merge(payment.id, { succeededAnnounced: true });
      }

      const res = await tronkFetchReportJson(
        { vin, id: prevState?.tronkTaskId, extra: { chatId, paymentId: payment.id } }
      );

      if (res.ok) {
        await generateAndSendTronkPdf({ chatId, vin, payload: res.data });

        await paymentsStore.merge(payment.id, { tronkTaskId: res.id, tronkCompleted: true });
        const histKey = `hist:tronk_rf:${chatId}:${vin}`;
        await paymentsStore.merge(histKey, { lastPaymentId: payment.id, tronkTaskId: res.id, completedAt: new Date().toISOString() });

        const expKey = `exp:tronk_rf:${chatId}:${vin}`;
        await paymentsStore.del(expKey).catch(()=>{});
        await sendPostMenuAfterRFByChat(chatId);
      } else {
        await bot.telegram.sendMessage(chatId, `Не удалось получить отчёт: ${res.error || 'ошибка'}`);
        await sendPostMenuAfterRFByChat(chatId);
      }
      return;
    }

    if (flow === 'vagvin_equipment' || flow === 'vagvin_oem') {
      await sendHTML(chatId, MSG_PAYMENT_RECEIVED_MANUAL,);
      setState(chatId, { lastVagService: (flow === 'vagvin_equipment' ? 'equipment' : 'oem_history') });
      await sendPostMenuByChat(chatId, { rfNeedsNewVin: true });
      return;
    }
  } catch (e) {
    await bot.telegram.sendMessage(chatId, `Ошибка после оплаты: ${e.message}`);
  }
}

/** waiting_for_capture → отправка в vagvin, затем capture */
async function onPaymentAuthorized({ chatId, vin, flow, payment }) {
  try {
    if (flow !== 'vagvin_equipment' && flow !== 'vagvin_oem') return;

    let command_str;
    let marka = normalizeBrand(payment?.metadata?.marka || null);

    if (!vin || !marka) {
      await bot.telegram.sendMessage(chatId, '⚠️ Оплата авторизована, но не хватает данных (VIN/марка). Авторизацию отменяю — деньги не спишутся.');
      try { await ykcCancelPayment(payment.id); } catch (e) { console.error('[YKC cancel] err', e?.message); }
      await deletePaymentPromptByChat(chatId);
      return;
    }
    if (flow === 'vagvin_equipment') {
      if (!isBrandSupportedForEquipment(marka)) {
        await bot.telegram.sendMessage(chatId, MSG_EQUIP_UNSUPPORTED(marka));
        await bot.telegram.sendMessage(chatId, '⚠️ Отменяю авторизацию — деньги не спишутся.');
        try { await ykcCancelPayment(payment.id); } catch {}
        await deletePaymentPromptByChat(chatId);
        await sendPostMenuByChat(chatId);
        return;
      }
      command_str = 'check_multibr_pr_kod';
    } else {
      if (!isBrandSupportedForOem(marka)) {
        await bot.telegram.sendMessage(chatId, MSG_OEM_UNSUPPORTED(marka));
        await bot.telegram.sendMessage(chatId, '⚠️ Отменяю авторизацию — деньги не спишутся.');
        try { await ykcCancelPayment(payment.id); } catch {}
        await deletePaymentPromptByChat(chatId);
        await sendPostMenuByChat(chatId);
        return;
      }
      command_str = chooseOemCommand(marka);
    }

    await sendHTML(chatId, `<b>Ваша оплата получена</b>📱 \nОтправляю запрос (${flow === 'vagvin_equipment' ? 'комплектация' : 'дилерская история'})…`);

    const res = await vagvinSubmit({ vin, marka, command_str, chatId, type: flow === 'vagvin_equipment' ? 'equipment' : 'oem_history' });

    if (!res.ok) {
      await bot.telegram.sendMessage(chatId, `❌ Не удалось отправить запрос: ${res.error || 'ошибка'}`);
      await bot.telegram.sendMessage(chatId, 'Отменяю авторизацию — деньги НЕ спишутся.');
      try {
        await ykcCancelPayment(payment.id);
        await bot.telegram.sendMessage(chatId, 'Оплата отменена. Можете попробовать снова.');
      } catch (e) {
        await bot.telegram.sendMessage(chatId, `⚠️ Не удалось отменить авторизацию: ${e.message}. Если средства спишутся — вернём автоматически.`);
      }
      await deletePaymentPromptByChat(chatId);
      await sendTypeSelectionByChat(chatId);
      return;
    }

    await sendHTML(chatId, `📥<b>Заявка принята в работу</b>`);

    const cap = await ykcCaptureWithRetries(payment.id, {
      explicitAmount: payment?.amount?.value,
      currency: payment?.amount?.currency,
      attempts: 3,
      retryDelayMs: 1000,
      finalBackoffAttempts: 5,
      finalBackoffDelayMs: 2500,
    });

    if (cap.ok) {
      await sendHTML(chatId, MSG_PAYMENT_RECEIVED_MANUAL,);
      setState(chatId, { lastVagService: (flow === 'vagvin_equipment' ? 'equipment' : 'oem_history') });
      await deletePaymentPromptByChat(chatId);
      await sendPostMenuAwaitingByChat(chatId, { rfNeedsNewVin: true });
    } else {
      const last = cap.last || (await yoo.getPayment(payment.id));
      if (last.status === 'waiting_for_capture') {
        await bot.telegram.sendMessage(chatId, '⚠️ Не удалось подтвердить списание несколько раз подряд. Отменяю авторизацию, деньги НЕ спишутся.');
        try { await ykcCancelPayment(payment.id); } catch (e) { console.error('[YKC cancel after fail] err', e?.message); }
      } else if (last.status === 'canceled') {
        await bot.telegram.sendMessage(chatId, '🙅‍♂️Оплата отменена платёжной системой.');
      } else {
        await bot.telegram.sendMessage(chatId, `⚠️ Не удалось подтвердить списание (статус: ${last.status || 'неизвестно'}).`);
      }
      await deletePaymentPromptByChat(chatId);
    }
  } catch (e) {
    console.error('[onPaymentAuthorized] err', e);
    await bot.telegram.sendMessage(chatId, `Ошибка обработки авторизации: ${e.message}`);
    try { await ykcCancelPayment(payment.id); } catch {}
    await deletePaymentPromptByChat(chatId);
  }
}

/* ========================== Telegraf: middleware & handlers ========================== */
bot.use(async (ctx, next) => { try { if (ctx.chat?.id) await usersStore.add(ctx.chat); } catch {} return next(); });
clearGlobalCommands().catch(()=>{});
setMenuButtonDefault().catch(()=>{});

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;
  setState(chatId, { stage: 'idle', processing: false, lastVin: null, pendingBrandSelection: null, lastRfCardText: null, lastVagService: null });
  await ensureStartedCommands(chatId);
  return sendTypeSelection(ctx);
});

/* --- Команды --- */
bot.command('menu', async (ctx) => {
  await ensureStartedCommands(ctx.chat.id);
  return sendTypeSelection(ctx); // не шлём «Открываю меню…» чтобы не шуметь
});
bot.command('equipment', async (ctx) => {
  await ensureStartedCommands(ctx.chat.id);
  setState(ctx.chat.id, { stage: 'await_vin_equipment', processing: false, pendingBrandSelection: null, lastVagService: 'equipment' });
  await ctx.reply('🧾 Выбрана проверка комплектации по VIN. Отправьте VIN автомобиля (17 символов)');
});
bot.command('oem_history', async (ctx) => {
  await ensureStartedCommands(ctx.chat.id);
  setState(ctx.chat.id, { stage: 'await_vin_oem_history', processing: false, pendingBrandSelection: null, lastVagService: 'oem_history' });
  await ctx.reply('🧾 Выбрана проверка истории авто по дилерской базе. Отправьте VIN автомобиля (17 символов)');
});
bot.command('rf', async (ctx) => {
  await ensureStartedCommands(ctx.chat.id);
  setState(ctx.chat.id, { stage: 'await_vin', processing: false, pendingBrandSelection: null });
  await ctx.reply('🧾 Выбрана полная проверка истории авто по РФ. Отправьте VIN автомобиля (17 символов)');
});

bot.action('start_flow', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx); // убрать кнопку «Начать» после нажатия
  await ensureStartedCommands(ctx.chat.id);
  return sendTypeSelection(ctx);
});

/* --- Инлайн кнопки (живые меню удаляем после клика) --- */
bot.action('type_equipment', async (ctx) => {
  await ensureStartedCommands(ctx.chat.id);
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx); // удалить меню «Выберите тип проверки»
  setState(ctx.chat.id, { stage: 'await_vin_equipment', processing: false, pendingBrandSelection: null, lastVagService: 'equipment' });
  await ctx.reply('🧾 Выбрана проверка комплектации по VIN. Отправьте VIN автомобиля (17 символов)');
});

bot.action('type_oem_history', async (ctx) => {
  await ensureStartedCommands(ctx.chat.id);
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx);
  setState(ctx.chat.id, { stage: 'await_vin_oem_history', processing: false, pendingBrandSelection: null, lastVagService: 'oem_history' });
  await ctx.reply('🧾 Выбрана проверка истории авто по дилерской базе. Отправьте VIN автомобиля (17 символов)');
});
bot.action('type_history', async (ctx) => {
  await ensureStartedCommands(ctx.chat.id);
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx);
  setState(ctx.chat.id, { stage: 'await_vin', processing: false, pendingBrandSelection: null });
  // ЭТА фраза должна остаться в чате (информативная и требует ответа VIN)
  await ctx.reply('🧾 Выбрана полная проверка истории авто по РФ. Отправьте VIN автомобиля (17 символов)');
});

/* Повторить тот же vagvin-тип, но ввести новый VIN */
bot.action('vag_again_same', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx);
  const st = getState(ctx.chat.id);
  if (st.lastVagService === 'oem_history') {
    setState(ctx.chat.id, { stage: 'await_vin_oem_history', processing: false, pendingBrandSelection: null });
    await ctx.reply('🧾 Выбрана проверка истории авто по дилерской базе. Отправьте VIN автомобиля (17 символов).');
  } else {
    setState(ctx.chat.id, { stage: 'await_vin_equipment', processing: false, pendingBrandSelection: null });
    await ctx.reply('🧾 Выбрана проверка комплектации по VIN. Отправьте VIN автомобиля (17 символов)');
  }
});

bot.action(/brand_page_(\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  const page = parseInt(ctx.match[1], 10) || 0;
  try { await ctx.editMessageReplyMarkup(buildBrandKeyboard(page).reply_markup); }
  catch { await ctx.reply('Выберите марку:', buildBrandKeyboard(page)); }
});

bot.action(/brand_pick_(\d+)/, async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx); // убрать список брендов после выбора
  const idx = parseInt(ctx.match[1], 10);
  const brand = BRANDS_LIST[idx];
  const chatId = ctx.chat.id;
  const st = getState(chatId);
  const pending = st.pendingBrandSelection;
  if (!pending || !brand) {
    await ctx.reply('Данные выбора марки устарели. Повторите действие.');
    return sendTypeSelection(ctx);
  }
  const { vin, service } = pending;
  const brandNorm = normalizeBrand(brand);
  if (service === 'equipment' && !isBrandSupportedForEquipment(brandNorm)) {
    await ctx.reply(MSG_EQUIP_UNSUPPORTED(brandNorm));
    await sendPostMenu(ctx);
    return;
  }
  if (service === 'oem_history' && !isBrandSupportedForOem(brandNorm)) {
    await ctx.reply(MSG_OEM_UNSUPPORTED(brandNorm));
    await sendPostMenu(ctx);
    return;
  }

  const flow  = (service === 'equipment') ? 'vagvin_equipment' : 'vagvin_oem';
  const price = (service === 'equipment') ? YKC_PRICE_VAG_EQUIP : YKC_PRICE_VAG_OEM;
  const title = (service === 'equipment') ? 'Комплектация ' : 'История по дилерской базе ';

  try {
    const { confirmationUrl } = await ykcCreatePayment({
      chatId, vin, flow, amount: price, description: `${title} — VIN ${vin}`,
      extraMeta: { marka: brandNorm }, capture: false
    });
    await showPaymentPrompt(ctx, { title, vin, amount: price, url: confirmationUrl, backAction: 'back_to_type' });
  } catch (e) {
    await ctx.reply('Не удалось создать платёж. Попробуйте ещё раз.');
  }

  setState(chatId, { processing: false, pendingBrandSelection: null, lastVin: vin, lastVagService: (service === 'equipment' ? 'equipment' : 'oem_history') });
});

bot.action('noop', async (ctx) => { try { await ctx.answerCbQuery('Страница списка брендов'); } catch {} });

/* ----- Ввод VIN ----- */
bot.on('text', async (ctx) => {

  const text = (ctx.message.text || '').trim();
  if (text === MENU_BTN_MAIN) {
    await ensureStartedCommands(ctx.chat.id);
    return sendTypeSelection(ctx);
  }
  if (text === MENU_BTN_EQUIPMENT) {
    await ensureStartedCommands(ctx.chat.id);
    setState(ctx.chat.id, {
      stage: 'await_vin_equipment',
      processing: false,
      pendingBrandSelection: null,
      lastVagService: 'equipment',
    });
    return ctx.reply('🧾 Выбрана проверка комплектации по VIN. Отправьте VIN автомобиля (17 символов)', buildReplyMainKeyboard());
  }
  if (text === MENU_BTN_OEM) {
    await ensureStartedCommands(ctx.chat.id);
    setState(ctx.chat.id, {
      stage: 'await_vin_oem_history',
      processing: false,
      pendingBrandSelection: null,
      lastVagService: 'oem_history',
    });
    return ctx.reply('🧾 Выбрана проверка истории авто по дилерской базе. Отправьте VIN автомобиля (17 символов)', buildReplyMainKeyboard());
  }
  if (text === MENU_BTN_RF) {
    await ensureStartedCommands(ctx.chat.id);
    setState(ctx.chat.id, {
      stage: 'await_vin',
      processing: false,
      pendingBrandSelection: null,
    });
    return ctx.reply('🧾 Выбрана полная проверка истории авто по РФ. Отправьте VIN автомобиля (17 символов)', buildReplyMainKeyboard());
  }
  const chatId = ctx.chat.id;
  const state = getState(chatId);
  const awaitingVin = state.stage && (
    state.stage.startsWith('await_vin') ||
    state.stage === 'await_vin_equipment' ||
    state.stage === 'await_vin_oem_history'
  );
  if (!awaitingVin) {
    return ctx.reply(
      'Нажмите «Начать», чтобы перейти к выбору типа проверки.',
      buildStartKeyboard()
    );
  }
  if (state.processing) return ctx.reply('Пожалуйста, дождитесь завершения текущей проверки.');

  const vinRaw = ctx.message.text.trim();
  const vin = vinValidate(vinRaw);
  if (!vin) return ctx.reply('Введён неверный VIN. Проверьте правильность (17 символов, без I, O, Q).');

  /* 1) Комплектация  — pay-gate */
  if (state.stage === 'await_vin_equipment') {
    setState(chatId, { processing: false, lastVin: vin, stage: 'processing_equipment', pendingBrandSelection: null, lastVagService: 'equipment' });
    const detected = detectBrandFromVin(vin);
    if (detected) {
      const brand = normalizeBrand(detected);
      if (!isBrandSupportedForEquipment(brand)) {
        await ctx.reply(MSG_EQUIP_UNSUPPORTED(brand));
        await sendPostMenu(ctx);
        return;
      }
      try {
        const { confirmationUrl } = await ykcCreatePayment({
          chatId, vin, flow: 'vagvin_equipment', amount: YKC_PRICE_VAG_EQUIP,
          description: `Комплектация по VIN  — VIN ${vin}`, extraMeta: { marka: brand }, capture: false
        });
        await showPaymentPrompt(ctx, { title: 'Комплектация ', vin, amount: YKC_PRICE_VAG_EQUIP, url: confirmationUrl, backAction: 'back_to_type' });
      } catch (e) { await ctx.reply('Не удалось создать платёж. Попробуйте ещё раз.'); }
    } else {
      await askBrandSelection(ctx, { vin, service: 'equipment', command_str: 'check_multibr_pr_kod', note: 'Марку по VIN определить не удалось.' });
    }
    return;
  }

  /* 2) Дилерская история  — pay-gate */
  if (state.stage === 'await_vin_oem_history') {
    setState(chatId, { processing: false, lastVin: vin, stage: 'processing_oem_history', pendingBrandSelection: null, lastVagService: 'oem_history' });
    const detected = detectBrandFromVin(vin);
    if (detected) {
      const brand = normalizeBrand(detected);
      if (!isBrandSupportedForOem(brand)) {
        await ctx.reply(MSG_OEM_UNSUPPORTED(brand));
        await sendPostMenu(ctx);
        return;
      }
      try {
        const { confirmationUrl } = await ykcCreatePayment({
          chatId, vin, flow: 'vagvin_oem', amount: YKC_PRICE_VAG_OEM,
          description: `История по дилерской базе  — VIN ${vin}`, extraMeta: { marka: brand }, capture: false
        });
        await showPaymentPrompt(ctx, { title: 'История по дилерской базе ', vin, amount: YKC_PRICE_VAG_OEM, url: confirmationUrl, backAction: 'back_to_type' });
      } catch (e) { await ctx.reply('Не удалось создать платёж. Попробуйте ещё раз.'); }
    } else {
      await askBrandSelection(ctx, { vin, service: 'oem_history', command_str: 'check_data_multibr_zapros', note: 'Марку по VIN определить не удалось.' });
    }
    return;
  }

  /* 3) РФ (api-assist + vPIC) — карточка */
  setState(chatId, { processing: true, lastVin: vin, stage: 'processing' });
  await sendRfProgress(ctx, '🔄Запрашиваю данные в открытой базе РФ ...');

  try {
    let result;
    try { result = await apiAssistCheck(vin); }
    catch (e) {
      await deleteEphemeralTag(chatId, EPHTAGS.RF_PROGRESS);
      await ctx.reply('Сервер ГИБДД временно недоступен...');
      const v = await vpicDecode(vin);
      if (v.ok && v.report && Object.keys(v.report).length) {
        await ctx.reply(renderVpicReportRu({ report: v.report, vin, title: 'Отчёт по открытым базам' }));
      } else {
        await ctx.reply(`Данных по этому VIN в открытых базах не найдено.${v.ok === false ? ` Ошибка: ${v.error}` : ''}`);
      }
      await sendRfMenuOnly(ctx, vin);
      setState(chatId, { processing: false, stage: 'rf_result' });
      return;
    }

    if (result.found === true) {
      await deleteEphemeralTag(chatId, EPHTAGS.RF_PROGRESS);
      const vehicle = result.vehicle || {};
      await sendMinimalVehicleInfo(ctx, {
        vin: vehicle.vin,
        brand: vehicle.model || vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        color: vehicle.color,
        engineVolume: vehicle.engineVolume,
        engineNumber: vehicle.engineNumber,
        vehiclePassportNumber: vehicle.vehiclePassportNumber,
        events: vehicle.events || []
      });
      setState(chatId, { processing: false, stage: 'rf_result' });
      return;
    } else {
      if (result.code === 403 || (result.raw && result.raw.error_code && (result.raw.error_code === 40304 || result.raw.error_code === 40305))) {
        await deleteEphemeralTag(chatId, EPHTAGS.RF_PROGRESS);
        await ctx.reply('🚫Сейчас сервер ГИБДД временно недоступен. Запускаю бесплатную проверку по другим каналам...');
        const v = await vpicDecode(vin);
        if (v.ok && v.report && Object.keys(v.report).length) {
          await ctx.reply(renderVpicReportRu({ report: v.report, vin, title: 'Отчёт по открытым базам' }));
        } else {
          await ctx.reply(`🚫Данных по этому VIN в открытых базах не найдено.${v.ok === false ? ` Ошибка: ${v.error}` : ''}`);
        }
        await sendRfMenuOnly(ctx, vin);
        return;
      }

      await ctx.reply('🚫Данный VIN не найден в базе ГИБДД России...');
      await deleteEphemeralTag(chatId, EPHTAGS.RF_PROGRESS);
      const v = await vpicDecode(vin);
      if (v.ok && v.report && Object.keys(v.report).length) {
        await ctx.reply(renderVpicReportRu({ report: v.report, vin, title: 'Отчёт по открытым базам' }));
      } else {
        await ctx.reply(`🚫Данных по этому VIN в открытых базах данных не найдены.${v.ok === false ? ` Ошибка: ${v.error}` : ''}`);
      }
      await sendRfMenuOnly(ctx, vin);
      return;
    }
  } finally {
    await deleteEphemeralTag(chatId, EPHTAGS.RF_PROGRESS);
    const cur = getState(chatId);
    if (cur.stage !== 'processing' && cur.processing) setState(chatId, { processing: false });
  }
});

/* === Бесплатная РФ-проверка TRONK раннер === */
async function runFreeRfTronk(ctx, vin) {
  const chatId = ctx.chat.id;
  try {
    await ctx.replyHTML(MSG_SUBS_CONFIRMED_FREE_RF,);
    const res = await tronkFetchReportJson({ vin, extra: { chatId } });
    if (res.ok) {
      await rfFreeStore.setUsedNow(chatId);
      await generateAndSendTronkPdf({ chatId, vin, payload: res.data });
      await sendPostMenuAfterRF(ctx);
    } else {
      await ctx.reply(`Не удалось выполнить бесплатную проверку: ${res.error || 'ошибка'}`);
    }
  } catch (e) {
    await ctx.reply(`Ошибка бесплатной проверки: ${e.message}`);
  }
}

/* === Экран подписки (живое меню; удаляется после нажатия «Проверить подписку») === */
async function showSubscribeGate(ctx) {
  const link = RF_SUBS_CHANNEL.startsWith('@')
    ? `https://t.me/${RF_SUBS_CHANNEL.slice(1)}`
    : RF_SUBS_CHANNEL;
  const kb = Markup.inlineKeyboard([
    [Markup.button.url('🔔 Открыть канал', link)],
    [Markup.button.callback('Проверить подписку', 'rf_free_check_sub')],
    [Markup.button.callback('⬅️ Назад к выбору типа', 'back_to_type')],
  ]);
  await ctx.reply(
    '❗️Чтобы БЕСПЛАТНО получить полный отчёт по РФ — подпишитесь на наш телеграмм канал и возвращайтесь за подарком.\n После подписки нажмите кнопку «Проверить подписку»',
    kb
  );
}

/* === Кнопка «Проверил подписку» === */
bot.action('rf_free_check_sub', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx); // прибираем «живое» меню подписки
  const chatId = ctx.chat.id;
  const st = getState(chatId);
  const vin = st.lastVin;
  if (!vin) {
    await ctx.reply('VIN не найден в текущем сеансе. Введите VIN и запустите проверку по РФ.');
    setState(chatId, { stage:'await_vin', processing:false });
    return;
  }
  const ok = await isUserSubscribed(chatId);
  if (!ok) {
    await ctx.reply('Похоже, подписка ещё не активна. Подпишитесь и попробуйте снова.');
    return;
  }
  if (await rfFreeStore.isAvailable(chatId)) {
    await runFreeRfTronk(ctx, vin);
  } else {
    const left = await rfFreeStore.remainingMs(chatId);
    await ctx.reply(`Бесплатная проверка уже использована. Доступна через ${msToHuman(left)}. Предлагаю оформить платную проверку.`);
  }
});

/* === Кнопка оплаты TRONK (из РФ-меню) — использует последний VIN === */
bot.action('full_check_rf', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx); // убираем RF-меню после клика
  const chatId = ctx.chat.id;
  const st = getState(chatId);
  const vin = st.lastVin;

  if (!vin) {
    await ctx.reply('VIN не найден в текущем сеансе. Введите VIN для проверки по РФ.');
    setState(chatId, { stage:'await_vin', processing:false });
    return;
  }

  const subscribed = await isUserSubscribed(chatId);
  if (!subscribed) {
    await showSubscribeGate(ctx);
    return;
  }

  if (await rfFreeStore.isAvailable(chatId)) {
    await runFreeRfTronk(ctx, vin);
    return;
  }

  try {
    const left = await rfFreeStore.remainingMs(chatId);
    const note = ` Вы уже использовали бесплатную проверку. Она будет доступна через ${msToHuman(left)}.\nДождитесь окончания времени, или получите проверку сейчас⬇️`;
    const { confirmationUrl, paymentId } = await ykcCreatePayment({
      chatId, vin, flow: 'tronk_rf', amount: YKC_PRICE_TRONK_RF,
      description: `Полная проверка по РФ — VIN ${vin}`, capture: true
    });

    const expKey = `exp:tronk_rf:${chatId}:${vin}`;
    await paymentsStore.put(expKey, { paymentId, chatId, vin, createdAt: new Date().toISOString() });

    await showPaymentPrompt(ctx, {
      title: 'Полная проверка по РФ',
      vin, amount: YKC_PRICE_TRONK_RF, url: confirmationUrl, backAction: 'back_to_rf_card', note
    });
  } catch (e) {
    await ctx.reply('Не удалось создать платёж. Попробуйте ещё раз или вернитесь назад.');
  }
});

/* === Полная проверка по РФ (из пост-меню vagvin) — всегда просим новый VIN === */
bot.action('full_check_rf_newvin', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx);
  await deletePaymentPromptByChat(ctx.chat.id);
  setState(ctx.chat.id, { stage: 'await_vin', processing: false, lastVin: null });
  await ctx.reply('Введите VIN для полной проверки по РФ: 17 символов, без I O Q.');
});

/* back */
bot.action('enter_another_vin', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx);
  await deletePaymentPromptByChat(ctx.chat.id);
  setState(ctx.chat.id, { stage: 'await_vin', processing: false, lastVin: null, pendingBrandSelection: null, lastRfCardText: null });
  await ctx.reply('Окей — введите VIN (17 символов, без I O Q).');
});
bot.action('back_to_type', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx);
  await deletePaymentPromptByChat(ctx.chat.id);
  await ensureStartedCommands(ctx.chat.id);
  return sendTypeSelection(ctx);
});
bot.action('back_to_rf_card', async (ctx) => {
  await ctx.answerCbQuery();
  await deleteCallbackMessage(ctx);
  await deletePaymentPromptByChat(ctx.chat.id);
  const st = getState(ctx.chat.id);
  if (st.lastRfCardText) await ctx.reply(st.lastRfCardText, buildRfKeyboard());
  else await sendTypeSelection(ctx);
});

bot.catch((err, ctx) => { console.error('Bot error', err, ctx?.update || ''); });

/* ========================== Express server & webhooks ========================== */
const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

/* === LEGAL: раздача /legal + алиасы === */
const LEGAL_DIR = path.resolve(__dirname, 'public', 'legal');
try { fsSync.mkdirSync(LEGAL_DIR, { recursive: true }); } catch {}
app.use('/legal', express.static(LEGAL_DIR, {
  index: false,
  maxAge: '30d',
  setHeaders(res, filePath) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (filePath.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf; charset=utf-8');
      const fname = path.basename(filePath);
      res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodeURIComponent(fname)}`);
    }
  },
}));
app.get(['/legal/privacy', '/legal/privacy.pdf'], (_req, res) =>
  res.sendFile(path.join(LEGAL_DIR, 'Политика конфиденциальности.pdf')));
app.get(['/legal/terms', '/legal/terms.pdf'], (_req, res) =>
  res.sendFile(path.join(LEGAL_DIR, 'Пользовательское_соглашение_Юкасса.pdf')));

const UPLOAD_DIR = path.resolve(__dirname, 'uploads');
try { fsSync.mkdirSync(UPLOAD_DIR, { recursive: true }); } catch {}
const upload = multer({ dest: UPLOAD_DIR, limits: { fileSize: 50 * 1024 * 1024, files: 20, fields: 200 } });

app.get('/healthz', (_req, res) => res.status(200).json({ ok: true }));

/* Опциональный HTTP-эндпоинт для получения TRONK JSON по VIN */
app.get('/tronk/reportjson', async (req, res) => {
  try {
    const vin = (req.query.vin || '').toString().trim();
    const gosnumber = (req.query.gosnumber || '').toString().trim() || undefined;
    const frame = (req.query.frame || '').toString().trim() || undefined;
    const id = (req.query.id || '').toString().trim() || undefined;
    if (!vin && !gosnumber && !frame && !id) return res.status(400).json({ ok:false, error:'need vin | gosnumber | frame | id' });
    const out = await tronkFetchReportJson({ vin, gosnumber, frame, id });
    if (!out.ok) return res.status(502).json({ ok:false, error: out.error, raw: out.raw });

    res.setHeader('Content-Disposition', `attachment; filename="Полный отчёт_${vin || id || 'report'}.json"`);
    return res.status(200).json(out.data);
  } catch (e) {
    return res.status(500).json({ ok:false, error: e.message });
  }
});

/* vagvin webhook logs */
app.use('/vagvin/webhook', (req, _res, next) => {
  console.log('[WEBHOOK incoming]', { method: req.method, url: req.originalUrl, contentType: req.headers['content-type'] });
  next();
});

function _humanVagType(t) { return t === 'equipment' ? 'комплектации' : 'дилерской базе'; }

app.all('/vagvin/webhook', upload.any(), async (req, res) => {
  try {
    const providedSecret = String(req.query.secret || req.headers['x-vagvin-secret'] || req.headers['x-webhook-secret'] || req.body?.secret || '');
    if (!WEBHOOK_SECRET || providedSecret !== WEBHOOK_SECRET) {
      console.warn('[WEBHOOK] unauthorized secret');
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }

    const payload = req.method === 'GET' ? (req.query || {}) : (typeof req.body === 'object' && req.body != null ? req.body : {});
    let nested = null;
    if (payload && typeof payload.data === 'string' && (/^\s*[\[{]/.test(payload.data))) {
      try { nested = JSON.parse(payload.data); } catch {}
    } else if (payload && typeof payload.data === 'object') nested = payload.data;
    nested = nested || {};

    const uid = payload.uid || nested.uid;
    const order_uiid = payload.order_uiid || nested.order_uiid || payload.order_uuid || nested.order_uuid;
    const keys = [uid, order_uiid].filter(Boolean);

    if (req.method === 'GET' && keys.length === 0) return res.status(200).json({ ok: true, note: 'pong' });

    const filesMeta = (req.files || []).map(f => ({ name: f.originalname, size: f.size, mime: f.mimetype }));
    console.log('[WEBHOOK fields]', Object.keys(payload||{}));
    console.log('[WEBHOOK files]', filesMeta);

    if (keys.length === 0) {
      console.warn('[WEBHOOK] no keys in payload');
      return res.status(200).json({ ok: true, note: 'accepted' });
    }

    let job = null;
    for (const k of keys) { job = await jobsStore.get(k); if (job) break; }
    if (!job) return res.status(200).json({ ok: true, note: 'job not found; accepted' });

    const chatId = job.chatId;
    setState(chatId, { lastVagService: job.type === 'equipment' ? 'equipment' : 'oem_history' });
    const vin = payload.vin || nested.vin || job.vin || '—';
    const status = (payload.status ?? nested.status);
    const url = payload.url || nested.url;
    const link = payload.link || nested.link;
    const report_url = payload.report_url || nested.report_url;
    const links = [url, link, report_url].filter(Boolean);

    const mainMsg =
      `📩 Ваш отчет по  ${_humanVagType(job.type)} готов! Номер VIN: ${vin}\n\n` +
      (status != null ? `\nСтатус: ${status}` : '');

    try {
      await bot.telegram.sendMessage(chatId, mainMsg);
      if (Array.isArray(req.files) && req.files.length) {
        for (const f of req.files) {
          try {
            await bot.telegram.sendDocument(
              chatId,
              { source: fsSync.createReadStream(f.path), filename: f.originalname || f.filename || 'file' },
              { caption: `Отчёт по ${_humanVagType(job.type)}` }
            );
          } catch (e) { console.error('[WEBHOOK] send file failed:', e?.message || e); }
          finally { try { await fs.unlink(f.path); } catch {} }
        }
      } else if (links.length) {
        for (const l of links) {
          try { await bot.telegram.sendMessage(chatId, String(l)); } catch (e) { console.error('[WEBHOOK] send link failed:', e?.message || e); }
        }
      }
      // Пост-меню; из vagvin РФ — всегда новый VIN (меню само удалится при кликах)
      try { await sendPostMenuByChat(chatId, { rfNeedsNewVin: true }); } catch {}
    } catch (e) { console.error('[WEBHOOK] telegram send error:', e?.message || e); }

    if (uid) await jobsStore.del(uid).catch(()=>{});
    if (order_uiid) await jobsStore.del(order_uiid).catch(()=>{});

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('[WEBHOOK] error:', e?.message || e);
    return res.status(500).json({ ok: false, error: 'internal' });
  }
});

/* === YooKassa return & webhook === */
app.get('/yookassa/return', (_req, res) => {
  res.type('html').send('<html><body><h3>Спасибо! Можете вернуться в чат.</h3></body></html>');
});

// In-flight защита по paymentId
const inflightPayments = new Map();

app.post('/yookassa/webhook', express.json({ type: '*/*' }), async (req, res) => {
  try {
    const event = req.body?.event;
    const paymentId = req.body?.object?.id;
    if (!paymentId) return res.status(400).json({ ok:false, error:'no payment id' });

    if (inflightPayments.has(paymentId)) {
      console.log('[YKC webhook] duplicate in-flight', paymentId);
      return res.json({ ok:true, note: 'duplicate_inflight' });
    }
    inflightPayments.set(paymentId, true);

    const payment = await yoo.getPayment(paymentId);
    const meta = payment.metadata || {};
    const chatId = Number(meta.chat_id);
    const vin = meta.vin || '';
    const flow = meta.flow || '';

    console.log('[YKC webhook]', { event, paymentId, status: payment.status, chatId, vin, flow });

    const prev = await paymentsStore.get(paymentId) || {};
    await paymentsStore.merge(paymentId, { status: payment.status, chatId, vin, flow });

    const expKey = (flow === 'tronk_rf' && chatId && vin) ? `exp:tronk_rf:${chatId}:${vin}` : null;
    if (flow === 'tronk_rf' && payment.status === 'succeeded') {
      const expected = expKey ? await paymentsStore.get(expKey) : null;

      if (expected && expected.paymentId && expected.paymentId !== paymentId) {
        console.log('[YKC webhook] tronk_rf succeeded but paymentId != expected; ignore', { expected: expected.paymentId, got: paymentId });
        inflightPayments.delete(paymentId);
        return res.json({ ok:true, note:'tronk_succeeded_not_expected' });
      }

      if (!expected) {
        const hist = await paymentsStore.get(`hist:tronk_rf:${chatId}:${vin}`);
        const cutoffMs = 12 * 60 * 60 * 1000; // 12 часов
        if (hist?.completedAt && (Date.now() - new Date(hist.completedAt).getTime() < cutoffMs)) {
          console.log('[YKC webhook] tronk_rf: no expected, but recent completed exists — ignore');
          inflightPayments.delete(paymentId);
          return res.json({ ok:true, note:'tronk_succeeded_ignored_recent' });
        }
      }
    }

    if (payment.status === 'waiting_for_capture') {
      if (prev.authHandled) { inflightPayments.delete(paymentId); return res.json({ ok:true, note:'dup_auth' }); }
      await paymentsStore.merge(paymentId, { authHandled: true });
      if (chatId) await onPaymentAuthorized({ chatId, vin, flow, payment });
      inflightPayments.delete(paymentId);
      return res.json({ ok:true });
    }

    if (payment.status === 'succeeded') {
      if (prev.succeededHandled) { inflightPayments.delete(paymentId); return res.json({ ok:true, note:'dup_succeeded' }); }
      await paymentsStore.merge(paymentId, { succeededHandled: true });
      if (chatId) await onPaymentSucceeded({ chatId, vin, flow, payment });
      if (flow === 'tronk_rf' && expKey) { await paymentsStore.del(expKey).catch(()=>{}); }
      inflightPayments.delete(paymentId);
      return res.json({ ok:true });
    }

    if (payment.status === 'canceled') {
      if (prev.canceledHandled) { inflightPayments.delete(paymentId); return res.json({ ok:true, note:'dup_canceled' }); }
      await paymentsStore.merge(paymentId, { canceledHandled: true });
      // Удалим живое меню оплаты, чтобы не висело
      if (meta?.chat_id) await deletePaymentPromptByChat(Number(meta.chat_id));
      inflightPayments.delete(paymentId);
      return res.json({ ok:true });
    }

    inflightPayments.delete(paymentId);
    return res.json({ ok:true });
  } catch (e) {
    console.error('[YKC webhook] error:', e.message);
    inflightPayments.delete(req.body?.object?.id || 'unknown');
    res.status(500).json({ ok:false, error:e.message });
  }
});

/* ========================== Startup ========================== */
(() => {
  app.listen(PORT, HOST, () => {
    console.log(`HTTP сервер запущен на http://${HOST}:${PORT}`);
    if (WEBHOOK_PUBLIC_BASE) {
      const base = WEBHOOK_PUBLIC_BASE.replace(/\/+$/, '');
      console.log('Ожидаемый adress_post:', `${base}/vagvin/webhook?secret=${WEBHOOK_SECRET}`);
    } else {
      console.log('ВНИМАНИЕ: WEBHOOK_PUBLIC_BASE не задан. Подними ngrok/cloudflared и укажи https URL.');
    }
  });

  (async () => {
    try {
      console.log('Запускаю Telegram-бота...');
      await bot.launch();
      console.log('Бот запущен (long-polling)');
      await clearGlobalCommands();
      await setMenuButtonDefault();
    } catch (e) {
      console.error('Не удалось запустить Telegram-бота:', e?.message || e);
    }

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  })();
})();
