type Forecasts = Forecast[];

type ILocation = {
  city: string;
  state: string;
  country: string;
};

type Forecast = {
  moonrise_ts: number;
  wind_cdir: string;
  rh: number;
  pres: number;
  high_temp: number;
  sunset_ts: number;
  ozone: number;
  moon_phase: number;
  wind_gust_spd: number;
  snow_depth: number;
  clouds: number;
  ts: number;
  sunrise_ts: number;
  app_min_temp: number;
  wind_spd: number;
  pop: number;
  wind_cdir_full: string;
  slp: number;
  moon_phase_lunation: number;
  valid_date: string;
  app_max_temp: number;
  vis: number;
  dewpt: number;
  snow: number;
  uv: number;
  weather: {
    icon: string;
    code: number;
    description: string;
  };
  wind_dir: number;
  max_dhi: number;
  clouds_hi: number;
  precip: number;
  low_temp: number;
  max_temp: number;
  moonset_ts: number;
  datetime: string;
  temp: number;
  min_temp: number;
  clouds_mid: number;
  clouds_low: number;
};

type WeatherData = {
  rh: string;
  pod: string;
  pres: number;
  timezone: string;
  ob_time: string;
  country_code: string;
  clouds: number;
  ts: number;
  solar_rad: number;
  state_code: string;
  city_name: string;
  wind_spd: number;
  last_ob_time: string;
  wind_cdir_full: string;
  wind_cdir: string;
  slp: number;
  vis: number;
  h_angle: number;
  sunset: string;
  dni_number: number;
  dewpt: number;
  snow: number;
  uv: number;
  precip: number;
  wind_dir: number;
  sunrise: string;
  ghi: number;
  dhi: number;
  aqi: number;
  lat: number;
  weather: {
    icon: string;
    code: string;
    description: string;
  };
  datetime: string;
  temp: number;
  station: string;
  elev_angle: number;
  app_temp: number;
};

type IHourlyForecast = {
  wind_cdir: string;
  rh: number;
  pod: string;
  timestamp_utc: string;
  pres: number;
  solar_rad: number;
  ozone: number;
  weather: {
    icon: string;
    code: number;
    description: string;
  };
  wind_gust_spd: number;
  timestamp_local: string;
  snow_depth: number;
  clouds: number;
  ts: number;
  wind_spd: number;
  pop: number;
  wind_cdir_full: string;
  slp: number;
  dni: number;
  dewpt: number;
  snow: number;
  uv: number;
  wind_dir: number;
  clouds_hi: number;
  precip: number;
  vis: number;
  dhi: number;
  app_temp: number;
  datetime: string;
  temp: number;
  ghi: number;
  clouds_mid: number;
  clouds_low: number;
};

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun' | '';

type ICoordinates = {
  lat: number;
  long: number;
};
