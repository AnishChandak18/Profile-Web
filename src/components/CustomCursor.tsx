import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      rafId = requestAnimationFrame(animateFollower);
    };

    const onMouseDown = () => cursor.classList.add('cursor-clicking');
    const onMouseUp = () => cursor.classList.remove('cursor-clicking');

    const onMouseEnterLink = () => cursor.classList.add('cursor-hover');
    const onMouseLeaveLink = () => cursor.classList.remove('cursor-hover');

    const attachLinkListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    rafId = requestAnimationFrame(animateFollower);
    attachLinkListeners();

    // Re-attach when DOM changes (lazy-loaded sections)
    const observer = new MutationObserver(attachLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <div id="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <div id="cursor-follower" ref={followerRef} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
