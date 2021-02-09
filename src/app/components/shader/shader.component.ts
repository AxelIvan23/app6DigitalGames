import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-shader',
  templateUrl: './shader.component.html',
  styleUrls: ['./shader.component.css']
})
export class ShaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
	

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById("fondo").appendChild( renderer.domElement );

	const camera = new THREE.OrthographicCamera(
	    -1, // left
	     1, // right
	     1, // top
	    -1, // bottom
	    -1, // near,
	     1, // far
	  );
	  const scene = new THREE.Scene();
	  const plane = new THREE.PlaneBufferGeometry(2, 2);

	  const fragmentShader = `
	  #include <common>

	  uniform vec3 iResolution;
	  uniform float iTime;
	  uniform sampler2D iChannel0;
	  uniform sampler2D iChannel1;

	  	float noise(vec2 p)
		{
			float s = texture(iChannel1,vec2(1.,2.*cos(iTime))*iTime*8. + p*1.).x;
			s *= s;
			return s;
		}

		float onOff(float a, float b, float c)
		{
			return step(c, sin(iTime + a*cos(iTime*b)));
		}

		float ramp(float y, float start, float end)
		{
			float inside = step(start,y) - step(end,y);
			float fact = (y-start)/(end-start)*inside;
			return (1.-fact) * inside;
			
		}

		float stripes(vec2 uv)
		{
			
			float noi = noise(uv*vec2(0.5,1.) + vec2(1.,3.));
			return ramp(mod(uv.y*4. + iTime/2.+sin(iTime + sin(iTime*0.63)),1.),0.5,0.6)*noi;
		}

		vec3 getVideo(vec2 uv)
		{
			vec2 look = uv;
			float window = 0.03/(1.+20.*(look.y-mod(iTime/4.,1.)));
			look.x = look.x + sin(look.y*60. + iTime)/70.*onOff(2.,2.,.3);
			float vShift = 0.05*onOff(2.,3.,.9)*(sin(iTime/2000.));
			look.y = mod(look.y + vShift, 1.);
			vec3 video = vec3(texture(iChannel0,look));
			return video;
		}

		vec2 screenDistort(vec2 uv)
		{
			uv -= vec2(.5,.5);
			uv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);
			uv += vec2(.5,.5);
			return uv;
		}

		void mainImage( out vec4 fragColor, in vec2 fragCoord )
		{
			vec2 uv = fragCoord.xy / iResolution.xy;
			uv = screenDistort(uv);
			vec3 video = getVideo(uv);
			float vigAmt = 3.+.3*sin(5.*cos(5.));
			float vignette = (1.-vigAmt*(uv.y-.5)*(uv.y-.5))*(1.-vigAmt*(uv.x-.5)*(uv.x-.5));
			
			video += stripes(uv);
			video += noise(uv*2.)/2.;
			video *= vignette;
			video *= (12.+mod(uv.y*30.+iTime,1.))/13.;
			
			fragColor = vec4(video,1.0);
		}

		void main() {
		    mainImage(gl_FragColor, gl_FragCoord.xy);
		}
	  `;
	  const loader = new THREE.TextureLoader();
	  const texture = loader.load('../../assets/img/fondo1.jpg');
	  const texture2 = loader.load('../../assets/img/noise.png');
	  texture.minFilter = THREE.NearestFilter;
	  texture.magFilter = THREE.NearestFilter;
	  texture.wrapS = THREE.RepeatWrapping;
	  texture.wrapT = THREE.RepeatWrapping;
	  const uniforms = {
	    iTime: { value: 0 },
	    iResolution:  { value: new THREE.Vector3() },
	    iChannel0: { value: texture },
	    iChannel1: { value: texture2 },
	  };
	  const material = new THREE.ShaderMaterial({
	    fragmentShader,
	    uniforms,
	  });
	  scene.add(new THREE.Mesh(plane, material));

	  function resizeRendererToDisplaySize(renderer) {
	    const canvas = renderer.domElement;
	    const width = canvas.clientWidth;
	    const height = canvas.clientHeight;
	    const needResize = canvas.width !== width || canvas.height !== height;
	    if (needResize) {
	      renderer.setSize(width, height, false);
	    }
	    return needResize;
	  }

	  function render(time) {
	    time *= 0.001;  // convert to seconds
	    
	    resizeRendererToDisplaySize(renderer);
	    renderer.setSize( window.innerWidth, window.innerHeight );
	    const canvas = renderer.domElement;
	    uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
	    uniforms.iTime.value = time;

	    renderer.render(scene, camera);

	    requestAnimationFrame(render);
	  }

	  requestAnimationFrame(render);
		
  }

}
