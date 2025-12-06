from langchain_openai import ChatOpenAI

api_key = "06d387c775a849ebafd6758afad98dd3"
base_url = "https://apim-pllum-tst-pcn.azure-api.net/vllm/v1"
model_name = "CYFRAGOVPL/pllum-12b-nc-chat-250715"


llm = ChatOpenAI(
    model=model_name,
    openai_api_key="EMPTY",
    openai_api_base=base_url,
    temperature=0.7,
    max_tokens=1000,
    default_headers={
        'Ocp-Apim-Subscription-Key': api_key
    }
)

tekst_do_wyjasnienia = """
1. Właściwy podmiot
DGA zawiera przepisy stanowiące podstawę do ponownego wykorzystywania chronionych
danych znajdujących się w posiadaniu podmiotów sektora publicznego (zob. pkt I.1
uzasadnienia). Aby wesprzeć podmioty sektora publicznego w procesie zezwalania na dostęp
do celów ponownego wykorzystywania tego rodzaju danych, rozporządzenie nakłada na
państwa członkowskie obowiązek wyznaczenia właściwego podmiotu (lub kilku takich
podmiotów, również sektorowych), które w zależności od potrzeb będą służyć pomocą
i wsparciem dla podmiotów sektora publicznego przez:
− zapewnianie wsparcia technicznego polegającego na udostępnianiu bezpiecznego
środowiska przetwarzania na potrzeby zapewniania dostępu do celów ponownego
wykorzystywania danych,
− udzielanie wskazówek i zapewnianie wsparcia technicznego w zakresie ustrukturyzowania
danych i ich przechowywania, tak aby były one łatwo dostępne,
− zapewnianie wsparcia technicznego w zakresie pseudonimizacji oraz zapewnianie
przetwarzania danych w sposób skutecznie chroniący prywatność, poufność, integralność
i dostępność informacji zawartych w danych, na których ponowne wykorzystywanie
zezwolono,
4
− udzielanie pomocy podmiotom sektora publicznego w zapewnianiu wsparcia ponownym
użytkownikom w występowaniu do osób, których dane dotyczą, o zgodę na ponowne
wykorzystywanie danych oraz do posiadaczy danych – o pozwolenie,
− udzielanie pomocy podmiotom sektora publicznego w zakresie oceny adekwatności
zobowiązań umownych w sytuacjach transferu danych do państw trzecich.
W przepisach projektowanej ustawy wyznaczony zostanie jeden właściwy podmiot. Funkcję tę
pełnić będzie Prezes Głównego Urzędu Statystycznego, dalej jako „Prezes GUS”.
Wybór Prezesa GUS wynika w głównej mierze z dużego doświadczenia Głównego Urzędu
Statystycznego, dalej jako „GUS”, w obszarze zbierania, przetwarzania oraz udostępniania
danych, z zachowaniem wymaganej przepisami prawa poufności danych.
Podstawą działalności GUS jest ustawa z dnia 29 czerwca 1995 r. o statystyce publicznej
(Dz. U. z 2024 r. poz. 1799), która zobowiązuje do bezwzględnej ochrony danych
jednostkowych identyfikowalnych zebranych w badaniach statystycznych i zabrania
wykorzystywania tych danych do innych celów niż opracowania, zestawienia i analizy
statystyczne oraz tworzenie przez Prezesa GUS operatu do badań statystycznych (art. 10 ww.
ustawy)
Ponadto, zgodnie z art. 38 ww. ustawy:
­ nie mogą być publikowane ani udostępniane uzyskane w badaniach statystycznych dane
jednostkowe identyfikowalne,
­ nie mogą być publikowane ani udostępniane uzyskane w badaniach statystycznych dane
statystyczne możliwe do powiązania i zidentyfikowania z konkretną osobą fizyczną oraz
informacje i dane statystyczne charakteryzujące wyniki ekonomiczno-finansowe
podmiotów gospodarki narodowej prowadzących działalność gospodarczą, jeżeli na daną
agregację składa się mniej niż trzy podmioty lub udział jednego podmiotu w określonym
zestawieniu jest większy niż trzy czwarte całości.
Z kolei na mocy art. 35aa ustawy z dnia 29 czerwca 1995 r. o statystyce publicznej, dane
osobowe od momentu ich zebrania bezpośrednio od respondentów albo z systemów
informacyjnych administracji publicznej i rejestrów urzędowych lub niepublicznych systemów
informacyjnych na potrzeby wykonywania zadań określonych w ustawie stają się danymi
statystycznymi i objęte są tajemnicą statystyczną z wyłączeniem informacji zawartych
w krajowym rejestrze urzędowym podmiotów gospodarki narodowej (rejestr REGON).
Za naruszenie tajemnicy statystycznej ustawa z dnia 29 czerwca 1995 r. o statystyce publicznej
przewiduje sankcje. Zgodnie z art. 54 tej ustawy, kto narusza tajemnicę statystyczną, podlega
karze pozbawienia wolności do lat 3.
5
Opracowywanie i udostępnianie informacji statystycznych zarówno w zakresie wskazanym
w corocznym Programie Badań Statystycznych Statystyki Publicznej określonym
w rozporządzeniu Rady Ministrów, jak i wykraczającym poza ten dokument (np. na
opracowania, analizy, badania realizowane na indywidualne zamówienie zgodnie z art. 21
ustawy z dnia 29 czerwca 1995 r. o statystyce publicznej), odbywa się zawsze przy całkowitym
przestrzeganiu wymienionych przepisów prawa. Odbiorcy zamawiający dane, które nie
funkcjonują w ramach ogólnodostępnego zasobu, są każdorazowo informowani o tym, że dane
zostaną opracowane i udostępnione z zachowaniem tajemnicy statystycznej.
Dodatkowym ograniczeniom poddane jest udostępnianie nieidentyfikowalnych danych
jednostkowych. Zbiory danych o tym charakterze mogą otrzymać jedynie ściśle określone
podmioty, tj. uniwersytety i inne instytucje szkolnictwa wyższego, instytuty naukowe
prowadzące badania oraz organy administracji publicznej. W takich przypadkach sporządzana
jest umowa między GUS, a zamawiającym, zgodnie z którą nie ma on prawa do dalszego
rozpowszechniania danych w otrzymanej formie i może je wykorzystywać wyłącznie do celów
wskazanych w umowie. Mając na względzie bezpieczeństwo danych, przekazywane są one
przy wykorzystaniu aplikacji internetowej umożliwiającej transfer plików z danymi
statystycznymi drogą elektroniczną w bezpiecznym połączeniu szyfrowanym (TransGUS).
Standardowy proces obsługi zapotrzebowania na dane jednostkowe uruchamiany jest na
podstawie złożonego przez uprawniony podmiot wniosku, wskazującego cel pozyskania
danych i informację, kto będzie miał dostęp do zbioru danych. Następny etap to ocena
możliwości realizacji zamówienia przez jednostki autorskie prowadzące badania. W przypadku
pozytywnej oceny, podmiot otrzymuje informacje o warunkach udostępnienia danych, w tym
konieczności zawarcia umowy, terminach przekazania danych, ewentualnie kosztach.
Akceptacja powyższych warunków pozwala na rozpoczęcie prac nad umową, która w swoich
zapisach uwzględnia m.in. obowiązki odbiorcy danych oraz kwestie środków dla zapewnienia
poufności danych statystycznych. Finalizacja zamówienia następuje po zawarciu umowy
i wpłacie należności na konto bankowe GUS, o ile realizacja wiązała się z odpłatnością.
Przygotowane zbiory danych sprawdzane są pod względem zachowania tajemnicy
statystycznej. Zweryfikowane zbiory przekazywane są elektronicznie do imiennie wskazanych
osób występujących w imieniu podmiotu, którym uprzednio nadano dostęp do TransGUS
(indywidualny login i hasło). Otrzymują one również instrukcje obsługi aplikacji.
W przypadku danych jednostkowych nieidentyfikowalnych pochodzących z badań
prowadzonych w ramach dziedziny statystyki społecznej oraz pochodzących ze spisów
powszechnych, udostępnienie na potrzeby analiz dokonywanych przez instytucje
6
naukowo-badawcze lub uczelnie odbywa się na Stanowisku Naukowiec – środowisku
informatycznym przeznaczonym do prowadzenia pogłębionych, specjalistycznych analiz,
zlokalizowanym w siedzibie GUS. Szczegółowe warunki korzystania ze Stanowiska
Naukowiec określa umowa między GUS a podmiotem zamawiającym dane. Zobowiązanie do
zachowania poufności zawiera oddzielny załącznik do takiej umowy. Osobom działającym w
imieniu podmiotu dostarczane są niezbędne instrukcje techniczne oraz zapewnione zostaje
wsparcie merytoryczne i informatyczne.
Dodatkowo jednym z istotniejszych zadań GUS jako właściwego podmiotu może być
zapewnienie podmiotowi sektora publicznego wsparcia technicznego przez udostępnienie
bezpiecznego środowiska przetwarzania na potrzeby zapewnienia dostępu do danych.
W motywie 7 DGA podkreślono, że na poziomie Unii Europejskiej zgromadzono
doświadczenie w zakresie takich bezpiecznych środowisk przetwarzania, które są
wykorzystywane do badań nad jednostkowymi danymi statystycznymi na podstawie
rozporządzenia Komisji (UE) nr 557/2013 z dnia 17 czerwca 2013 r. w sprawie wykonania
rozporządzenia (WE) nr 223/2009 Parlamentu Europejskiego i Rady w sprawie europejskiej
statystyki w zakresie dostępu do poufnych danych do celów naukowych i uchylającego
rozporządzenie Komisji (WE) nr 831/2002 (Dz. Urz. UE L 164 z 18.06.2013, str. 16).
Ponadto Ministerstwo Cyfryzacji, analizując możliwą strukturę otoczenia
instytucjonalno-organizacyjnego dla DGA w Polsce, brało również pod uwagę rozwiązania
planowane w innych państwach członkowskich Unii Europejskiej. Model, w którym jako
właściwy podmiot wyznaczana jest instytucja statystyki publicznej, jest często stosowany (zob.
szerzej OSR).
"""

#instrukcja = "Nie potwierdzaj wykonania zadania, nie tłumacz co wypisujesz, nie pytaj czy masz zrobić coś jeszcze. Podaj wyłącznie sam wynik polecenia, nic innego poza wynikiem, nie zadawaj żadnych pytań ani nagłówków. Proszę, wytłumacz ten tekst pochodzący z przepisów prawa polskiego używająć prostego języka zrozumiałego dla dziecka, wykonaj podsumowanie podanego poniżej tekstu zawierając jedynie najważniejsze informacje używając maksimum 500 słów: "
instrukcja = "Uprość tekst, jako wynik podaj wyłącznie zmodyfikowany tekst"

response = llm.invoke(instrukcja + tekst_do_wyjasnienia)
tekst = response.content
lines = tekst.splitlines()
clean = "\n".join(lines[1:])
print(clean.strip())