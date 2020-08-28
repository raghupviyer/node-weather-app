const form = document.querySelector('form');
const input = document.querySelector('input');

const p_load = document.querySelector('.load');
const p_desc = document.querySelector('.desc');
const p_obs = document.querySelector('.obs');
const p_temp = document.querySelector('.temp');
const p_precip = document.querySelector('.precip');
const p_lat = document.querySelector('.lat');
const p_long = document.querySelector('.long');
const p_wspeed = document.querySelector('.wspeed');
const p_wdeg = document.querySelector('.wdeg');
const p_wdir = document.querySelector('.wdir');
const p_pres = document.querySelector('.pres');
const p_humid = document.querySelector('.humid');
const p_vis = document.querySelector('.vis');
const h5 = document.querySelectorAll('h5');

h5.style = 'display: none';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	p_load.textContent = 'LOADING ...';
	fetch(`/weather?address=${input.value}`).then((res) => res.json()).then((resp) => {
		h5.style = '';
		if (resp.error) {
			p_load.textContent = resp.error;
		} else {
			p_load.textContent = '';
			p_desc.textContent = resp.description;
			p_obs.textContent = resp.ObservationTime;
			p_temp.textContent = resp.temp;
			p_precip.textContent = resp.precipitation;
			p_lat.textContent = resp.lat;
			p_long.textContent = resp.long;
			p_wspeed.textContent = resp.windSpeed;
			p_wdeg.textContent = resp.windDegree;
			p_wdir.textContent = resp.windDir;
			p_pres.textContent = resp.pressure;
			p_humid.textContent = resp.humidity;
			p_vis.textContent = resp.visibility;
		}
	});
});
