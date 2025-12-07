# Monitor Legislacyjny

Kompleksowe i bieżące śledzenie wszystkich zmian prawnych od momentu ich inicjacji aż po wejście w życie z możliwością wprowadzenia własnego wkładu w proces legislacyjny.

## Wstęp
Urzędnicze dokumenty (w tym regulacje i przepisy prawne) często zawierają skomplikowany, formalny język, który może być trudny do zrozumienia dla przeciętnego odbiorcy. Monitor Legislacyjny zmienia to poprzez dostarczanie przejrzystych informacji o procesach legislacyjnych i umożliwienie obywatelom partycypacji w konsultacjach publicznych. Cała strona ma na celu połączenie społeczeństwa z tymi, którzy tworzą prawo, aby urzędnik czuli obecność "szarego" Polaka podczas podejmowania decyzji zmieniających życie obywateli.

## Cel projektu
Monitor Legislacyjny ma na celu:
- Zwiększenie przejrzystości procesów legislacyjnych
- Umożliwienie obywatelom aktywnego uczestnictwa w tworzeniu prawa
- Ułatwienie zrozumienia skomplikowanych procesów prawnych
- Wspieranie informowanego społeczeństwa poprzez dostęp do bieżących informacji o zmianach prawnych

## Główne funkcjonalności
Podstawowo więszkość naszych danych które się wpisują nie zapisują się nigdzie i działają tylko na aktualnej sesji.

### 📋 Projekty ustaw
Zakładka zawiera informacje o aktualnie wprowadzanych ustawach i nowelizacjach z możliwością:
- **Filtrowania** pod względem tematu, etapu wprowadzenia oraz nazwy projektu
- **Grupowania** projektów według tematów
- **Śledzenia statusu** każdego projektu z wyświetleniem następnego kroku
- **Dostępu do akcji**:
  - *Szczegóły* – rozwinięcie pełnych informacji o projekcie
  - *Alert* – dodanie projektu do obserwowanych
  - *Komentarz* – dodanie własnej opinii
  - *Konsultacje społeczne* – link do konsultacji publicznych
Oczywiście same projekty ustaw w naszym projekcie są stworzone poglądowo z powodu braku możliwości uzyskania dostepu do API strony Rządowego Centrum Legislacji. Na celu mieliśmy osiągnięcie przejrzystości oraz łatwości zrozumienia dla osób w każdym wieku. Inspirowaliśmy się programem Unii Europejskiej "Legislative Train Schedule". Monitorem legislacyjnym chcemy zapobiegać konsternacji narastającej w Polakach, dlatego pomimo iż w Polsce mamy 14 różnych stanów w którym może pozostawać ustawa, uprościliśmy tę liczbę do połowy — czyli 7. Natomiast kropek jest 6 ponieważ nie liczymy etapu Publikacji. W tej zakładce także, możemy znaleźć Komentarze, Alerty i Wyszukiwarkę Projektów i Ustaw. Komentarze są anonimowym, jednorazowym wpisem niemożliwy do edycji po zatwierdzeniu. Jest to część połączenia Społeczeństwa przy pomocy wyrażenia swojej opinii z Władzą Legislacyjną. Kolejne to przyscisk Alert, który po wciśnięciu dodaje nam możliwość obserwacji nowych zmian w ustawach, które nas interesują, na bieżąco, w zakładce Alerty wyżej. Ostatnia na liście jest wyszukiwarka projektów i ustaw, która pozwala filtrować interesujące nas ustawy.

### 📊 Śledzenie zmian
Bieżące informacje o wszystkich aktualizacjach procesów legislacyjnych:
- Aktualizacje tekstów projektów
- Rozpoczęcie nowych konsultacji publicznych
- Dodanie nowych projektów do systemu
- Powiadomienia o nowych projektach w etapie konsultacji (najwyższy wpływ obywateli)
Zakładka śledzenie zmian pomaga nam w bardzo szczegółowym znalezieniu interesujacych nas zmian - przy użyciu filtrów. Ustawy zmieniają się rzadko, natomiast często niezauważalnie, co w wielu przypadkach wprowadza w błąd osoby, które nie obserwują na co dzień mediów rządowych lub telewizji uwidaczniających życie polityczne. Dodatkowo w tej zakładce jest funkcja szybkiego śledzenia nowych projektów, dzięki której na sms lub e-mail dostaniemy wiadomości o nadchodzący świeżych projektach, które dopiero znalazły się na forum publicznym. Ponownie, jak i z poprzednią zakładką bez API nie jesteśmy w stanie zrobić pełnego prototypu, tylko podstawowe demo, które nie jest w stanie pokazać całego potencjału funkcji.

### 🔍 Analiza wpływu
Szczegółowa analiza możliwego wpływu ustawy na różne aspekty życia obywateli:
- Wpływ na sektor finansów publicznych
- Konkurencyjność gospodarki i przedsiębiorczość
- Zmiana obciążeń regulacyjnych
- Wpływ na rynek pracy
- Pozostałe obszary społeczno-gospodarcze
Analiza wpływu polega na ocenie obecnej w dokumencie OSR dzięki któremu tworzymy widełki finansów publicznych, procesów operacyjnych i procesów społecznych. Na tej podstawie można dodatkowo ocenić, czy ustawa jest wszechstronna, czy skupia się na poszczególnym aspekcie gospodarki. Podobnie do reszty, brak API, funkcji nie ma :)

### 🔔 Alerty
Ciągłe informowanie o nowinkach:
- Lista najnowszych aktualizacji statusów projektów
- Powiadomienia o wprowadzeniu nowych projektów
- Konfiguracja preferowanych kategorii alertów
- Wyświetlanie "alertowanych" ustaw oraz i komentarzy napisanych pod ustawami
Zakładka alerty ma na celu pokazywanie zmian na ustawach, które wcześniej zostały zaznaczone w zakładce Projekty Ustaw jako obserwowane. Wyświetlają się tam tylko nowe zmiany od tego czasu gdy użytkownik zazanczył Alert na tą ustawę. Wyświetlane Alerty są wprowadzone "na sztywno", ponieważ z soboty na niedziele nie wprowadza się nowych ustaw ;)

### 📖 Język prosty
Przełumaczenie skomplikowanego formalnego języka na polski zrozumiały dla każdego:
- Objaśnienie niezrozumiałych fragmentów dokumentów
- Wyjaśnienie znaczenia i zastosowania przepisów w praktyce
- Ułatwienie zrozumienia struktury pism formalnych
Jest to proste ułatwienie robione na podstawie asystenta AI, który po tym gdy dostanie tekst od użytkownika upraszcza go aby był bardziej zrozumiały niż tekst formalny. AI jest oparty na modelu firmy NASK. Niestety mamy taki model, który nie daje rady z bardzo dużymi tekstami ustaw, więc dla pełnej funkcjonalności trzeba byłoby wdrożyć kolejne rozwiazania po stronie backend umożliwiające obsługiwanie pełnych dokumentów.

### 👤 Dostęp użytkowników
Personalizacja doświadczenia użytkownika:
- System logowania (przyszłości integracja z mObywatel)
- Możliwość wprowadzania nowych projektów
- Eksport raportów
- Konfiguracja alertów i preferencji
- Zarządzanie obserwowanymi projektami
Ta zakładka nie powinna istnieć, lecz chcieliśmy aby logowanie odbywało się przez mObywatela, a nie mamy możliwości tego zrobić bez rządowych pozwoleń, ale chodzi w zakładce o to że na dole można wybrać czy jest się urzędnikiem czy obywatelem, jako obywatel można tylko konfigurować swoje powiadomienia, lecz jako urzędnik można także dodawać nowe projekty lub ustawy, oraz można eksportować raport zmian i nowych ustaw, które w ostatnim czasie zostały dodane lub zmienione. Są tam również aktualności, które byłyby widoczne w momencie wchodzenia na strone aby się zalogować są to 3 najnowsze wydarzenia, które stały się na naszym Moniotrze Legislacyjnym.
Ponieważ logowanie przez mObywatel nie jest dostepne, aplikacja nie zawiera wdrożonego systemu logowania. Docelowo, każdy obywatel może odwiedzic stronę, ale dopiero gdy chce zmienić coś znaczącego dla poszczególnego obywatela jest proszony o logowanie (np. dodanie komentarza, alertu). Na tę chwilę wszystko odbywa się bez takowej walidacji tożsamości. Gdyby istniał system logowania, istniałby również profile użytkowników oraz urzędników - którzy mieliby w swoim profilu możliwość zmiany statusów projektów oraz inne opcje dostępne wyłącznie dla pracowników administracji.

Strona ma również w prawy górnym rogu możliwości zmiany czcionki na większą lub mniejszą, przycisk do zmiany kontrastu oraz szybką wyszukiwarke ustaw. W lewym górnym rogu obok przycisków gov.pl oraz dostępność jest przycisk "Instrukcja Użytkownika", która w założeniu ma pomagać użytkownikowi w użyciu strony.
Cała reszta innych przykładowo wszystko co jest w footerze jest dosyć Self-Explanatory.